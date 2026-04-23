export interface Product {
  id: string;
  name: string;
  description: string | null;
  price: number;
  stock: number;
  status: 'ACTIVE' | 'INACTIVE';
  categoryId: string;
  supplierId: string | null;
  createdAt: Date;
  updatedAt: Date;
}
