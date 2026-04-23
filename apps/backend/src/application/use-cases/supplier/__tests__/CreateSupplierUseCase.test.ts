import { CreateSupplierUseCase } from '../CreateSupplierUseCase';
import { ISupplierRepository } from '../../../../domain/repositories/ISupplierRepository';
import { ValidationError } from '../../../../domain/errors/ValidationError';
import { Supplier } from '../../../../domain/entities/Supplier';

describe('CreateSupplierUseCase', () => {
  let repo: jest.Mocked<ISupplierRepository>;
  let useCase: CreateSupplierUseCase;

  beforeEach(() => {
    repo = {
      findAll: jest.fn(),
      findById: jest.fn(),
      findByEmail: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    };
    useCase = new CreateSupplierUseCase(repo);
  });

  it('should create supplier', async () => {
    repo.findByEmail.mockResolvedValue(null);
    const created: Supplier = {
      id: 's1',
      company: 'Acme',
      contact: 'John',
      email: 'new@acme.com',
      phone: null,
      status: 'ACTIVE',
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    repo.create.mockResolvedValue(created);

    const result = await useCase.execute({
      company: 'Acme',
      contact: 'John',
      email: 'new@acme.com',
    });

    expect(result).toEqual(created);
  });

  it('should throw ValidationError if email duplicate', async () => {
    repo.findByEmail.mockResolvedValue({
      id: 'x',
      company: 'Other',
      contact: 'c',
      email: 'dup@x.com',
      phone: null,
      status: 'ACTIVE',
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    await expect(
      useCase.execute({ company: 'A', contact: 'B', email: 'dup@x.com' }),
    ).rejects.toThrow(ValidationError);
    expect(repo.create).not.toHaveBeenCalled();
  });
});
