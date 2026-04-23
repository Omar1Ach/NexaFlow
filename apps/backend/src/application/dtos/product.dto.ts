export interface CreateProductInputDTO {
  name: string;
  description?: string | null;
  price: number;
  stock?: number;
  status?: 'ACTIVE' | 'INACTIVE';
  categoryId: string;
  supplierId?: string | null;
}

export interface UpdateProductInputDTO {
  name?: string;
  description?: string | null;
  price?: number;
  stock?: number;
  status?: 'ACTIVE' | 'INACTIVE';
  categoryId?: string;
  supplierId?: string | null;
}
