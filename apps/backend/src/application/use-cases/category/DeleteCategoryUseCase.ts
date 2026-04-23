import { ICategoryRepository } from '../../../domain/repositories/ICategoryRepository';
import { NotFoundError } from '../../../domain/errors/NotFoundError';

export class DeleteCategoryUseCase {
  constructor(private readonly categoryRepository: ICategoryRepository) {}

  async execute(id: string): Promise<void> {
    const existing = await this.categoryRepository.findById(id);
    if (!existing) {
      throw new NotFoundError('Category', id);
    }
    await this.categoryRepository.delete(id);
  }
}
