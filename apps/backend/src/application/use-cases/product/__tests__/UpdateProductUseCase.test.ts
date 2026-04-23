import { UpdateProductUseCase } from '../UpdateProductUseCase';
import { IProductRepository } from '../../../../domain/repositories/IProductRepository';
import { NotFoundError } from '../../../../domain/errors/NotFoundError';
import { Product } from '../../../../domain/entities/Product';

describe('UpdateProductUseCase', () => {
  let repo: jest.Mocked<IProductRepository>;
  let useCase: UpdateProductUseCase;

  const existing: Product = {
    id: 'p1',
    name: 'Mouse',
    description: null,
    price: 10,
    stock: 5,
    status: 'ACTIVE',
    categoryId: 'c1',
    supplierId: null,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  beforeEach(() => {
    repo = {
      findAll: jest.fn(),
      findById: jest.fn(),
      findByCategoryId: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    };
    useCase = new UpdateProductUseCase(repo);
  });

  it('should update product', async () => {
    repo.findById.mockResolvedValue(existing);
    const updated: Product = { ...existing, price: 20 };
    repo.update.mockResolvedValue(updated);

    const result = await useCase.execute('p1', { price: 20 });

    expect(result).toEqual(updated);
    expect(repo.update).toHaveBeenCalledWith('p1', { price: 20 });
  });

  it('should throw NotFoundError if product not found', async () => {
    repo.findById.mockResolvedValue(null);
    await expect(useCase.execute('missing', { price: 1 })).rejects.toThrow(NotFoundError);
    expect(repo.update).not.toHaveBeenCalled();
  });
});
