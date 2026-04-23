import { CreateCategoryUseCase } from '../CreateCategoryUseCase';
import { ICategoryRepository } from '../../../../domain/repositories/ICategoryRepository';
import { ValidationError } from '../../../../domain/errors/ValidationError';
import { Category } from '../../../../domain/entities/Category';

describe('CreateCategoryUseCase', () => {
  let repo: jest.Mocked<ICategoryRepository>;
  let useCase: CreateCategoryUseCase;

  beforeEach(() => {
    repo = {
      findAll: jest.fn(),
      findById: jest.fn(),
      findByName: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    };
    useCase = new CreateCategoryUseCase(repo);
  });

  it('should create and return category', async () => {
    repo.findByName.mockResolvedValue(null);
    const created: Category = {
      id: '1',
      name: 'Books',
      description: null,
      status: 'ACTIVE',
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    repo.create.mockResolvedValue(created);

    const result = await useCase.execute({ name: 'Books' });

    expect(result).toEqual(created);
    expect(repo.create).toHaveBeenCalledWith({
      name: 'Books',
      description: null,
      status: 'ACTIVE',
    });
  });

  it('should throw ValidationError if name already exists', async () => {
    repo.findByName.mockResolvedValue({
      id: 'x',
      name: 'Books',
      description: null,
      status: 'ACTIVE',
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    await expect(useCase.execute({ name: 'Books' })).rejects.toThrow(ValidationError);
    expect(repo.create).not.toHaveBeenCalled();
  });
});
