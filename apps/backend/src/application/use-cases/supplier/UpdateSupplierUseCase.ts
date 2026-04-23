import { Supplier } from '../../../domain/entities/Supplier';
import { ISupplierRepository } from '../../../domain/repositories/ISupplierRepository';
import { NotFoundError } from '../../../domain/errors/NotFoundError';
import { UpdateSupplierInputDTO } from '../../dtos/supplier.dto';

export class UpdateSupplierUseCase {
  constructor(private readonly supplierRepository: ISupplierRepository) {}

  async execute(id: string, input: UpdateSupplierInputDTO): Promise<Supplier> {
    const existing = await this.supplierRepository.findById(id);
    if (!existing) {
      throw new NotFoundError('Supplier', id);
    }
    return this.supplierRepository.update(id, input);
  }
}
