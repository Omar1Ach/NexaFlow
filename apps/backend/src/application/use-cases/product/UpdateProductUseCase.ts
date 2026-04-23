import { Product } from '../../../domain/entities/Product';
import { IProductRepository } from '../../../domain/repositories/IProductRepository';
import { NotFoundError } from '../../../domain/errors/NotFoundError';
import { UpdateProductInputDTO } from '../../dtos/product.dto';

export class UpdateProductUseCase {
  constructor(private readonly productRepository: IProductRepository) {}

  async execute(id: string, input: UpdateProductInputDTO): Promise<Product> {
    const existing = await this.productRepository.findById(id);
    if (!existing) {
      throw new NotFoundError('Product', id);
    }
    return this.productRepository.update(id, input);
  }
}
