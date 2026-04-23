import { Supplier } from '../../../domain/entities/Supplier';
import { ISupplierRepository } from '../../../domain/repositories/ISupplierRepository';
import { ValidationError } from '../../../domain/errors/ValidationError';
import { CreateSupplierInputDTO } from '../../dtos/supplier.dto';

export class CreateSupplierUseCase {
  constructor(private readonly supplierRepository: ISupplierRepository) {}

  async execute(input: CreateSupplierInputDTO): Promise<Supplier> {
    const existing = await this.supplierRepository.findByEmail(input.email);
    if (existing) {
      throw new ValidationError('Supplier email already in use', [
        { field: 'email', message: 'Supplier email already in use' },
      ]);
    }

    return this.supplierRepository.create({
      company: input.company,
      contact: input.contact,
      email: input.email,
      phone: input.phone ?? null,
      status: input.status ?? 'ACTIVE',
    });
  }
}
