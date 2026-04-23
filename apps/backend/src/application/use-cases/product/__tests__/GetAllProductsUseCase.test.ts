import { GetAllProductsUseCase } from '../GetAllProductsUseCase';
import { IProductRepository } from '../../../../domain/repositories/IProductRepository';
import { Product } from '../../../../domain/entities/Product';

describe('GetAllProductsUseCase', () => {
  let repo: jest.Mocked<IProductRepository>;
  let useCase: GetAllProductsUseCase;

  beforeEach(() => {
    repo = {
      findAll: jest.fn(),
      findById: jest.fn(),
      findByCategoryId: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    };
    useCase = new GetAllProductsUseCase(repo);
  });

  it('should return array of products', async () => {
    const products: Product[] = [
      {
        id: '1',
        name: 'Mouse',
        description: null,
        price: 10,
        stock: 5,
        status: 'ACTIVE',
        categoryId: 'c1',
        supplierId: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];
    repo.findAll.mockResolvedValue(products);

    const result = await useCase.execute();
    expect(result).toEqual(products);
  });
});
