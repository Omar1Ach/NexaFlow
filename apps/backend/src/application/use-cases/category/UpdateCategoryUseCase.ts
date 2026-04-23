import { Category } from '../../../domain/entities/Category';
import { ICategoryRepository } from '../../../domain/repositories/ICategoryRepository';
import { NotFoundError } from '../../../domain/errors/NotFoundError';
import { UpdateCategoryInputDTO } from '../../dtos/category.dto';

export class UpdateCategoryUseCase {
  constructor(private readonly categoryRepository: ICategoryRepository) {}

  async execute(id: string, input: UpdateCategoryInputDTO): Promise<Category> {
    const existing = await this.categoryRepository.findById(id);
    if (!existing) {
      throw new NotFoundError('Category', id);
    }
    return this.categoryRepository.update(id, input);
  }
}
