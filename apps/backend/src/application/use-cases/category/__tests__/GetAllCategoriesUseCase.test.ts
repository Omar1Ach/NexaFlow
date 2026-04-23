import { GetAllCategoriesUseCase } from '../GetAllCategoriesUseCase';
import { ICategoryRepository } from '../../../../domain/repositories/ICategoryRepository';
import { Category } from '../../../../domain/entities/Category';

describe('GetAllCategoriesUseCase', () => {
  let repo: jest.Mocked<ICategoryRepository>;
  let useCase: GetAllCategoriesUseCase;

  beforeEach(() => {
    repo = {
      findAll: jest.fn(),
      findById: jest.fn(),
      findByName: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    };
    useCase = new GetAllCategoriesUseCase(repo);
  });

  it('should return array of categories', async () => {
    const categories: Category[] = [
      {
        id: '1',
        name: 'Electronics',
        description: null,
        status: 'ACTIVE',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];
    repo.findAll.mockResolvedValue(categories);

    const result = await useCase.execute();

    expect(result).toEqual(categories);
    expect(repo.findAll).toHaveBeenCalledTimes(1);
  });

  it('should return empty array when none exist', async () => {
    repo.findAll.mockResolvedValue([]);
    const result = await useCase.execute();
    expect(result).toEqual([]);
  });
});
