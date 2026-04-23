// Prisma-backed implementation of IProductRepository
import { PrismaClient } from '@prisma/client';
import { Product } from '../../domain/entities/Product';
import {
  CreateProductData,
  IProductRepository,
  UpdateProductData,
} from '../../domain/repositories/IProductRepository';

export class ProductRepository implements IProductRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async findAll(): Promise<Product[]> {
    return this.prisma.product.findMany({ orderBy: { createdAt: 'desc' } });
  }

  async findById(id: string): Promise<Product | null> {
    return this.prisma.product.findUnique({ where: { id } });
  }

  async findByCategoryId(categoryId: string): Promise<Product[]> {
    return this.prisma.product.findMany({
      where: { categoryId },
      orderBy: { createdAt: 'desc' },
    });
  }

  async create(data: CreateProductData): Promise<Product> {
    return this.prisma.product.create({ data });
  }

  async update(id: string, data: UpdateProductData): Promise<Product> {
    return this.prisma.product.update({ where: { id }, data });
  }

  async delete(id: string): Promise<void> {
    await this.prisma.product.delete({ where: { id } });
  }
}
