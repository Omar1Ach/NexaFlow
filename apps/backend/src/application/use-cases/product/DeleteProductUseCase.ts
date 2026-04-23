import { IProductRepository } from '../../../domain/repositories/IProductRepository';
import { NotFoundError } from '../../../domain/errors/NotFoundError';

export class DeleteProductUseCase {
  constructor(private readonly productRepository: IProductRepository) {}

  async execute(id: string): Promise<void> {
    const existing = await this.productRepository.findById(id);
    if (!existing) {
      throw new NotFoundError('Product', id);
    }
    await this.productRepository.delete(id);
  }
}
