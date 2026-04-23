// Supplier repository contract — defines persistence operations for Supplier entity
import { Supplier } from '../entities/Supplier';

export type CreateSupplierData = Omit<Supplier, 'id' | 'createdAt' | 'updatedAt'>;
export type UpdateSupplierData = Partial<CreateSupplierData>;

export interface ISupplierRepository {
  findAll(): Promise<Supplier[]>;
  findById(id: string): Promise<Supplier | null>;
  create(data: CreateSupplierData): Promise<Supplier>;
  update(id: string, data: UpdateSupplierData): Promise<Supplier>;
  delete(id: string): Promise<void>;
}
