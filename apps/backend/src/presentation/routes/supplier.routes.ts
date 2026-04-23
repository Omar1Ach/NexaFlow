import { Router } from 'express';
import { container } from '../../infrastructure/container';
import { validate } from '../middlewares/validate';
import { createSupplierSchema, updateSupplierSchema } from '../schemas/supplier.schema';

const router = Router();
const { supplierController } = container.controllers;

router.get('/', supplierController.list);
router.get('/:id', supplierController.findOne);
router.post('/', validate(createSupplierSchema), supplierController.createOne);
router.put('/:id', validate(updateSupplierSchema), supplierController.updateOne);
router.delete('/:id', supplierController.deleteOne);

export default router;
