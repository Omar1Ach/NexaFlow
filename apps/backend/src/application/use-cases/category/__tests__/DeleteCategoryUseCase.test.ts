import { DeleteCategoryUseCase } from '../DeleteCategoryUseCase';
import { ICategoryRepository } from '../../../../domain/repositories/ICategoryRepository';
import { NotFoundError } from '../../../../domain/errors/NotFoundError';

describe('DeleteCategoryUseCase', () => {
  let repo: jest.Mocked<ICategoryRepository>;
  let useCase: DeleteCategoryUseCase;

  beforeEach(() => {
    repo = {
      findAll: jest.fn(),
      findById: jest.fn(),
      findByName: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    };
    useCase = new DeleteCategoryUseCase(repo);
  });

  it('should delete category successfully', async () => {
    repo.findById.mockResolvedValue({
      id: '1',
      name: 'X',
      description: null,
      status: 'ACTIVE',
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    repo.delete.mockResolvedValue(undefined);

    await expect(useCase.execute('1')).resolves.toBeUndefined();
    expect(repo.delete).toHaveBeenCalledWith('1');
  });

  it('should throw NotFoundError if id not found', async () => {
    repo.findById.mockResolvedValue(null);

    await expect(useCase.execute('missing')).rejects.toThrow(NotFoundError);
    expect(repo.delete).not.toHaveBeenCalled();
  });
});
