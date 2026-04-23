import { Product } from '../../../domain/entities/Product';
import { IProductRepository } from '../../../domain/repositories/IProductRepository';
import { ICategoryRepository } from '../../../domain/repositories/ICategoryRepository';
import { NotFoundError } from '../../../domain/errors/NotFoundError';
import { CreateProductInputDTO } from '../../dtos/product.dto';

export class CreateProductUseCase {
  constructor(
    private readonly productRepository: IProductRepository,
    private readonly categoryRepository: ICategoryRepository,
  ) {}

  async execute(input: CreateProductInputDTO): Promise<Product> {
    const category = await this.categoryRepository.findById(input.categoryId);
    if (!category) {
      throw new NotFoundError('Category', input.categoryId);
    }

    return this.productRepository.create({
      name: input.name,
      description: input.description ?? null,
      price: input.price,
      stock: input.stock ?? 0,
      status: input.status ?? 'ACTIVE',
      categoryId: input.categoryId,
      supplierId: input.supplierId ?? null,
    });
  }
}
