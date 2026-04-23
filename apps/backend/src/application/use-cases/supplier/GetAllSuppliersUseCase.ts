import { Supplier } from '../../../domain/entities/Supplier';
import { ISupplierRepository } from '../../../domain/repositories/ISupplierRepository';

export class GetAllSuppliersUseCase {
  constructor(private readonly supplierRepository: ISupplierRepository) {}

  async execute(): Promise<Supplier[]> {
    return this.supplierRepository.findAll();
  }
}
