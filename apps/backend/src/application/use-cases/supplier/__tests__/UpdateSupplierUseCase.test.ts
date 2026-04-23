import { UpdateSupplierUseCase } from '../UpdateSupplierUseCase';
import { ISupplierRepository } from '../../../../domain/repositories/ISupplierRepository';
import { NotFoundError } from '../../../../domain/errors/NotFoundError';
import { Supplier } from '../../../../domain/entities/Supplier';

describe('UpdateSupplierUseCase', () => {
  let repo: jest.Mocked<ISupplierRepository>;
  let useCase: UpdateSupplierUseCase;

  const existing: Supplier = {
    id: 's1',
    company: 'Old',
    contact: 'c',
    email: 'o@x.com',
    phone: null,
    status: 'ACTIVE',
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  beforeEach(() => {
    repo = {
      findAll: jest.fn(),
      findById: jest.fn(),
      findByEmail: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    };
    useCase = new UpdateSupplierUseCase(repo);
  });

  it('should update supplier', async () => {
    repo.findById.mockResolvedValue(existing);
    const updated: Supplier = { ...existing, company: 'New' };
    repo.update.mockResolvedValue(updated);

    const result = await useCase.execute('s1', { company: 'New' });

    expect(result).toEqual(updated);
    expect(repo.update).toHaveBeenCalledWith('s1', { company: 'New' });
  });

  it('should throw NotFoundError if not found', async () => {
    repo.findById.mockResolvedValue(null);
    await expect(useCase.execute('missing', { company: 'X' })).rejects.toThrow(NotFoundError);
    expect(repo.update).not.toHaveBeenCalled();
  });
});
