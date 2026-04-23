import { PrismaClient } from '@prisma/client';
import { Supplier } from '../../domain/entities/Supplier';
import {
  CreateSupplierData,
  ISupplierRepository,
  UpdateSupplierData,
} from '../../domain/repositories/ISupplierRepository';

export class SupplierRepository implements ISupplierRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async findAll(): Promise<Supplier[]> {
    return this.prisma.supplier.findMany({ orderBy: { createdAt: 'desc' } });
  }

  async findById(id: string): Promise<Supplier | null> {
    return this.prisma.supplier.findUnique({ where: { id } });
  }

  async findByEmail(email: string): Promise<Supplier | null> {
    return this.prisma.supplier.findUnique({ where: { email } });
  }

  async create(data: CreateSupplierData): Promise<Supplier> {
    return this.prisma.supplier.create({ data });
  }

  async update(id: string, data: UpdateSupplierData): Promise<Supplier> {
    return this.prisma.supplier.update({ where: { id }, data });
  }

  async delete(id: string): Promise<void> {
    await this.prisma.supplier.delete({ where: { id } });
  }
}
