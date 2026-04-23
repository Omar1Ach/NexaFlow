// Prisma-backed implementation of IUserRepository
import { PrismaClient } from '@prisma/client';
import { User } from '../../domain/entities/User';
import { CreateUserData, IUserRepository } from '../../domain/repositories/IUserRepository';

export class UserRepository implements IUserRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async findByEmail(email: string): Promise<User | null> {
    return this.prisma.user.findUnique({ where: { email } });
  }

  async findById(id: string): Promise<User | null> {
    return this.prisma.user.findUnique({ where: { id } });
  }

  async create(data: CreateUserData): Promise<User> {
    return this.prisma.user.create({ data });
  }
}
