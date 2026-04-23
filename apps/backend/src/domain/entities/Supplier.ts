export interface Supplier {
  id: string;
  company: string;
  contact: string;
  email: string;
  phone: string | null;
  status: 'ACTIVE' | 'INACTIVE';
  createdAt: Date;
  updatedAt: Date;
}
