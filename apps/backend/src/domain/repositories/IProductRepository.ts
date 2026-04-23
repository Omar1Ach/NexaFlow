// Product repository contract — defines persistence operations for Product entity
import { Product } from '../entities/Product';

export type CreateProductData = Omit<Product, 'id' | 'createdAt' | 'updatedAt'>;
export type UpdateProductData = Partial<CreateProductData>;

export interface IProductRepository {
  findAll(): Promise<Product[]>;
  findById(id: string): Promise<Product | null>;
  findByCategoryId(categoryId: string): Promise<Product[]>;
  create(data: CreateProductData): Promise<Product>;
  update(id: string, data: UpdateProductData): Promise<Product>;
  delete(id: string): Promise<void>;
}
