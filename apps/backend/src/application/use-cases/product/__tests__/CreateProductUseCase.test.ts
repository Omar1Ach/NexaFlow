import { CreateProductUseCase } from '../CreateProductUseCase';
import { IProductRepository } from '../../../../domain/repositories/IProductRepository';
import { ICategoryRepository } from '../../../../domain/repositories/ICategoryRepository';
import { NotFoundError } from '../../../../domain/errors/NotFoundError';
import { Product } from '../../../../domain/entities/Product';
import { Category } from '../../../../domain/entities/Category';

describe('CreateProductUseCase', () => {
  let productRepo: jest.Mocked<IProductRepository>;
  let categoryRepo: jest.Mocked<ICategoryRepository>;
  let useCase: CreateProductUseCase;

  beforeEach(() => {
    productRepo = {
      findAll: jest.fn(),
      findById: jest.fn(),
      findByCategoryId: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    };
    categoryRepo = {
      findAll: jest.fn(),
      findById: jest.fn(),
      findByName: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    };
    useCase = new CreateProductUseCase(productRepo, categoryRepo);
  });

  it('should create product successfully', async () => {
    const category: Category = {
      id: 'c1',
      name: 'Elec',
      description: null,
      status: 'ACTIVE',
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    categoryRepo.findById.mockResolvedValue(category);
    const created: Product = {
      id: 'p1',
      name: 'Mouse',
      description: null,
      price: 10,
      stock: 0,
      status: 'ACTIVE',
      categoryId: 'c1',
      supplierId: null,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    productRepo.create.mockResolvedValue(created);

    const result = await useCase.execute({
      name: 'Mouse',
      price: 10,
      categoryId: 'c1',
    });

    expect(result).toEqual(created);
    expect(productRepo.create).toHaveBeenCalledWith({
      name: 'Mouse',
      description: null,
      price: 10,
      stock: 0,
      status: 'ACTIVE',
      categoryId: 'c1',
      supplierId: null,
    });
  });

  it('should throw NotFoundError if categoryId invalid', async () => {
    categoryRepo.findById.mockResolvedValue(null);

    await expect(
      useCase.execute({ name: 'X', price: 1, categoryId: 'bad' }),
    ).rejects.toThrow(NotFoundError);
    expect(productRepo.create).not.toHaveBeenCalled();
  });
});
