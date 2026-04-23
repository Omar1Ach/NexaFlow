// Product domain entity — represents inventory items
export interface Product {
  id: string;
  name: string;
  description?: string;
  price: number;
  stock: number;
  status: 'ACTIVE' | 'INACTIVE';
  categoryId: string;
  supplierId?: string;
  createdAt: Date;
  updatedAt: Date;
}
