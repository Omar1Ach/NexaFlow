// Category domain entity — groups related products together
export interface Category {
  id: string;
  name: string;
  description?: string;
  status: 'ACTIVE' | 'INACTIVE';
  createdAt: Date;
  updatedAt: Date;
}
