// User repository contract — defines persistence operations for User entity
import { User } from '../entities/User';

export type CreateUserData = Omit<User, 'id' | 'createdAt' | 'updatedAt'>;

export interface IUserRepository {
  findByEmail(email: string): Promise<User | null>;
  findById(id: string): Promise<User | null>;
  create(data: CreateUserData): Promise<User>;
}
