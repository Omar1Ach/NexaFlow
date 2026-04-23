// Database seed script — populates initial data for development
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main(): Promise<void> {
  console.log('🌱 Seeding database...');

  // Create default admin user
  const hashedPassword = await bcrypt.hash('admin123', 10);
  const admin = await prisma.user.upsert({
    where: { email: 'admin@nexaflow.com' },
    update: {},
    create: {
      email: 'admin@nexaflow.com',
      password: hashedPassword,
      name: 'Admin',
      role: 'ADMIN',
    },
  });
  console.log(`  ✔ Admin user: ${admin.email}`);

  // Create sample categories
  const electronics = await prisma.category.upsert({
    where: { name: 'Electronics' },
    update: {},
    create: {
      name: 'Electronics',
      description: 'Electronic devices and accessories',
      status: 'ACTIVE',
    },
  });

  const furniture = await prisma.category.upsert({
    where: { name: 'Furniture' },
    update: {},
    create: {
      name: 'Furniture',
      description: 'Office and home furniture',
      status: 'ACTIVE',
    },
  });
  console.log(`  ✔ Categories: ${electronics.name}, ${furniture.name}`);

  // Create sample supplier
  const supplier = await prisma.supplier.upsert({
    where: { email: 'supplier@example.com' },
    update: {},
    create: {
      company: 'TechSupply Co.',
      contact: 'John Doe',
      email: 'supplier@example.com',
      phone: '+1234567890',
      status: 'ACTIVE',
    },
  });
  console.log(`  ✔ Supplier: ${supplier.company}`);

  // Create sample products
  await prisma.product.createMany({
    skipDuplicates: true,
    data: [
      {
        name: 'Wireless Mouse',
        description: 'Ergonomic wireless mouse',
        price: 29.99,
        stock: 150,
        status: 'ACTIVE',
        categoryId: electronics.id,
        supplierId: supplier.id,
      },
      {
        name: 'Standing Desk',
        description: 'Adjustable height standing desk',
        price: 499.99,
        stock: 25,
        status: 'ACTIVE',
        categoryId: furniture.id,
        supplierId: supplier.id,
      },
    ],
  });
  console.log('  ✔ Sample products created');

  console.log('✅ Seeding complete!');
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
