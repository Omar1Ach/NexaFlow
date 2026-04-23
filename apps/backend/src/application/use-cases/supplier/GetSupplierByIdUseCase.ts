import { Supplier } from '../../../domain/entities/Supplier';
import { ISupplierRepository } from '../../../domain/repositories/ISupplierRepository';
import { NotFoundError } from '../../../domain/errors/NotFoundError';

export class GetSupplierByIdUseCase {
  constructor(private readonly supplierRepository: ISupplierRepository) {}

  async execute(id: string): Promise<Supplier> {
    const supplier = await this.supplierRepository.findById(id);
    if (!supplier) {
      throw new NotFoundError('Supplier', id);
    }
    return supplier;
  }
}
