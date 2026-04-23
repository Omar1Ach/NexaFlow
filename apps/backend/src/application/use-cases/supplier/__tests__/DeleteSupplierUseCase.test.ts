import { DeleteSupplierUseCase } from '../DeleteSupplierUseCase';
import { ISupplierRepository } from '../../../../domain/repositories/ISupplierRepository';
import { NotFoundError } from '../../../../domain/errors/NotFoundError';

describe('DeleteSupplierUseCase', () => {
  let repo: jest.Mocked<ISupplierRepository>;
  let useCase: DeleteSupplierUseCase;

  beforeEach(() => {
    repo = {
      findAll: jest.fn(),
      findById: jest.fn(),
      findByEmail: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    };
    useCase = new DeleteSupplierUseCase(repo);
  });

  it('should delete supplier', async () => {
    repo.findById.mockResolvedValue({
      id: 's1',
      company: 'X',
      contact: 'c',
      email: 'x@x.com',
      phone: null,
      status: 'ACTIVE',
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    repo.delete.mockResolvedValue(undefined);

    await expect(useCase.execute('s1')).resolves.toBeUndefined();
    expect(repo.delete).toHaveBeenCalledWith('s1');
  });

  it('should throw NotFoundError if not found', async () => {
    repo.findById.mockResolvedValue(null);
    await expect(useCase.execute('missing')).rejects.toThrow(NotFoundError);
    expect(repo.delete).not.toHaveBeenCalled();
  });
});
