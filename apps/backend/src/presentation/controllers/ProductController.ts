import { NextFunction, Request, Response } from 'express';
import { GetAllProductsUseCase } from '../../application/use-cases/product/GetAllProductsUseCase';
import { GetProductByIdUseCase } from '../../application/use-cases/product/GetProductByIdUseCase';
import { CreateProductUseCase } from '../../application/use-cases/product/CreateProductUseCase';
import { UpdateProductUseCase } from '../../application/use-cases/product/UpdateProductUseCase';
import { DeleteProductUseCase } from '../../application/use-cases/product/DeleteProductUseCase';

export class ProductController {
  constructor(
    private readonly getAll: GetAllProductsUseCase,
    private readonly getById: GetProductByIdUseCase,
    private readonly create: CreateProductUseCase,
    private readonly update: UpdateProductUseCase,
    private readonly remove: DeleteProductUseCase,
  ) {}

  list = async (_req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const data = await this.getAll.execute();
      res.status(200).json({ success: true, data, message: 'Products retrieved' });
    } catch (err) {
      next(err);
    }
  };

  findOne = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const data = await this.getById.execute(req.params.id);
      res.status(200).json({ success: true, data, message: 'Product retrieved' });
    } catch (err) {
      next(err);
    }
  };

  createOne = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const data = await this.create.execute(req.body);
      res.status(201).json({ success: true, data, message: 'Product created' });
    } catch (err) {
      next(err);
    }
  };

  updateOne = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const data = await this.update.execute(req.params.id, req.body);
      res.status(200).json({ success: true, data, message: 'Product updated' });
    } catch (err) {
      next(err);
    }
  };

  deleteOne = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      await this.remove.execute(req.params.id);
      res.status(200).json({ success: true, data: null, message: 'Product deleted' });
    } catch (err) {
      next(err);
    }
  };
}
