import { DeleteProductUseCase } from '../DeleteProductUseCase';
import { IProductRepository } from '../../../../domain/repositories/IProductRepository';
import { NotFoundError } from '../../../../domain/errors/NotFoundError';

describe('DeleteProductUseCase', () => {
  let repo: jest.Mocked<IProductRepository>;
  let useCase: DeleteProductUseCase;

  beforeEach(() => {
    repo = {
      findAll: jest.fn(),
      findById: jest.fn(),
      findByCategoryId: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    };
    useCase = new DeleteProductUseCase(repo);
  });

  it('should delete product', async () => {
    repo.findById.mockResolvedValue({
      id: 'p1',
      name: 'X',
      description: null,
      price: 1,
      stock: 0,
      status: 'ACTIVE',
      categoryId: 'c1',
      supplierId: null,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    repo.delete.mockResolvedValue(undefined);

    await expect(useCase.execute('p1')).resolves.toBeUndefined();
    expect(repo.delete).toHaveBeenCalledWith('p1');
  });

  it('should throw NotFoundError if not found', async () => {
    repo.findById.mockResolvedValue(null);
    await expect(useCase.execute('missing')).rejects.toThrow(NotFoundError);
    expect(repo.delete).not.toHaveBeenCalled();
  });
});
