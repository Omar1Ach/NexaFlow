import { UpdateCategoryUseCase } from '../UpdateCategoryUseCase';
import { ICategoryRepository } from '../../../../domain/repositories/ICategoryRepository';
import { NotFoundError } from '../../../../domain/errors/NotFoundError';
import { Category } from '../../../../domain/entities/Category';

describe('UpdateCategoryUseCase', () => {
  let repo: jest.Mocked<ICategoryRepository>;
  let useCase: UpdateCategoryUseCase;

  const existing: Category = {
    id: '1',
    name: 'Old',
    description: null,
    status: 'ACTIVE',
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  beforeEach(() => {
    repo = {
      findAll: jest.fn(),
      findById: jest.fn(),
      findByName: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    };
    useCase = new UpdateCategoryUseCase(repo);
  });

  it('should update and return category', async () => {
    repo.findById.mockResolvedValue(existing);
    const updated: Category = { ...existing, name: 'New' };
    repo.update.mockResolvedValue(updated);

    const result = await useCase.execute('1', { name: 'New' });

    expect(result).toEqual(updated);
    expect(repo.update).toHaveBeenCalledWith('1', { name: 'New' });
  });

  it('should throw NotFoundError if id not found', async () => {
    repo.findById.mockResolvedValue(null);

    await expect(useCase.execute('missing', { name: 'X' })).rejects.toThrow(NotFoundError);
    expect(repo.update).not.toHaveBeenCalled();
  });
});
