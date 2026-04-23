// Supplier domain entity — external vendor providing products
export interface Supplier {
  id: string;
  company: string;
  contact: string;
  email: string;
  phone?: string;
  status: 'ACTIVE' | 'INACTIVE';
  createdAt: Date;
  updatedAt: Date;
}
