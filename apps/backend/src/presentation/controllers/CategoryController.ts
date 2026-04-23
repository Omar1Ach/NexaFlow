import { NextFunction, Request, Response } from 'express';
import { GetAllCategoriesUseCase } from '../../application/use-cases/category/GetAllCategoriesUseCase';
import { GetCategoryByIdUseCase } from '../../application/use-cases/category/GetCategoryByIdUseCase';
import { CreateCategoryUseCase } from '../../application/use-cases/category/CreateCategoryUseCase';
import { UpdateCategoryUseCase } from '../../application/use-cases/category/UpdateCategoryUseCase';
import { DeleteCategoryUseCase } from '../../application/use-cases/category/DeleteCategoryUseCase';

export class CategoryController {
  constructor(
    private readonly getAll: GetAllCategoriesUseCase,
    private readonly getById: GetCategoryByIdUseCase,
    private readonly create: CreateCategoryUseCase,
    private readonly update: UpdateCategoryUseCase,
    private readonly remove: DeleteCategoryUseCase,
  ) {}

  list = async (_req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const data = await this.getAll.execute();
      res.status(200).json({ success: true, data, message: 'Categories retrieved' });
    } catch (err) {
      next(err);
    }
  };

  findOne = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const data = await this.getById.execute(req.params.id);
      res.status(200).json({ success: true, data, message: 'Category retrieved' });
    } catch (err) {
      next(err);
    }
  };

  createOne = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const data = await this.create.execute(req.body);
      res.status(201).json({ success: true, data, message: 'Category created' });
    } catch (err) {
      next(err);
    }
  };

  updateOne = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const data = await this.update.execute(req.params.id, req.body);
      res.status(200).json({ success: true, data, message: 'Category updated' });
    } catch (err) {
      next(err);
    }
  };

  deleteOne = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      await this.remove.execute(req.params.id);
      res.status(200).json({ success: true, data: null, message: 'Category deleted' });
    } catch (err) {
      next(err);
    }
  };
}
