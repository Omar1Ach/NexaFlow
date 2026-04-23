import { NextFunction, Request, Response } from 'express';
import { GetAllSuppliersUseCase } from '../../application/use-cases/supplier/GetAllSuppliersUseCase';
import { GetSupplierByIdUseCase } from '../../application/use-cases/supplier/GetSupplierByIdUseCase';
import { CreateSupplierUseCase } from '../../application/use-cases/supplier/CreateSupplierUseCase';
import { UpdateSupplierUseCase } from '../../application/use-cases/supplier/UpdateSupplierUseCase';
import { DeleteSupplierUseCase } from '../../application/use-cases/supplier/DeleteSupplierUseCase';

export class SupplierController {
  constructor(
    private readonly getAll: GetAllSuppliersUseCase,
    private readonly getById: GetSupplierByIdUseCase,
    private readonly create: CreateSupplierUseCase,
    private readonly update: UpdateSupplierUseCase,
    private readonly remove: DeleteSupplierUseCase,
  ) {}

  list = async (_req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const data = await this.getAll.execute();
      res.status(200).json({ success: true, data, message: 'Suppliers retrieved' });
    } catch (err) {
      next(err);
    }
  };

  findOne = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const data = await this.getById.execute(req.params.id);
      res.status(200).json({ success: true, data, message: 'Supplier retrieved' });
    } catch (err) {
      next(err);
    }
  };

  createOne = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const data = await this.create.execute(req.body);
      res.status(201).json({ success: true, data, message: 'Supplier created' });
    } catch (err) {
      next(err);
    }
  };

  updateOne = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const data = await this.update.execute(req.params.id, req.body);
      res.status(200).json({ success: true, data, message: 'Supplier updated' });
    } catch (err) {
      next(err);
    }
  };

  deleteOne = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      await this.remove.execute(req.params.id);
      res.status(200).json({ success: true, data: null, message: 'Supplier deleted' });
    } catch (err) {
      next(err);
    }
  };
}
