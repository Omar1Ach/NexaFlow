import { Category } from '../../../domain/entities/Category';
import { ICategoryRepository } from '../../../domain/repositories/ICategoryRepository';
import { ValidationError } from '../../../domain/errors/ValidationError';
import { CreateCategoryInputDTO } from '../../dtos/category.dto';

export class CreateCategoryUseCase {
  constructor(private readonly categoryRepository: ICategoryRepository) {}

  async execute(input: CreateCategoryInputDTO): Promise<Category> {
    const existing = await this.categoryRepository.findByName(input.name);
    if (existing) {
      throw new ValidationError('Category name already in use', [
        { field: 'name', message: 'Category name already in use' },
      ]);
    }

    return this.categoryRepository.create({
      name: input.name,
      description: input.description ?? null,
      status: input.status ?? 'ACTIVE',
    });
  }
}
