export interface CreateSupplierInputDTO {
  company: string;
  contact: string;
  email: string;
  phone?: string | null;
  status?: 'ACTIVE' | 'INACTIVE';
}

export interface UpdateSupplierInputDTO {
  company?: string;
  contact?: string;
  email?: string;
  phone?: string | null;
  status?: 'ACTIVE' | 'INACTIVE';
}
