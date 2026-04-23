export interface CreateCategoryInputDTO {
  name: string;
  description?: string | null;
  status?: 'ACTIVE' | 'INACTIVE';
}

export interface UpdateCategoryInputDTO {
  name?: string;
  description?: string | null;
  status?: 'ACTIVE' | 'INACTIVE';
}
