import { ISupplierRepository } from '../../../domain/repositories/ISupplierRepository';
import { NotFoundError } from '../../../domain/errors/NotFoundError';

export class DeleteSupplierUseCase {
  constructor(private readonly supplierRepository: ISupplierRepository) {}

  async execute(id: string): Promise<void> {
    const existing = await this.supplierRepository.findById(id);
    if (!existing) {
      throw new NotFoundError('Supplier', id);
    }
    await this.supplierRepository.delete(id);
  }
}
