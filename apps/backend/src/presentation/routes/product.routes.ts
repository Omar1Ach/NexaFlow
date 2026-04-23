import { Router } from 'express';
import { container } from '../../infrastructure/container';
import { validate } from '../middlewares/validate';
import { createProductSchema, updateProductSchema } from '../schemas/product.schema';

const router = Router();
const { productController } = container.controllers;

router.get('/', productController.list);
router.get('/:id', productController.findOne);
router.post('/', validate(createProductSchema), productController.createOne);
router.put('/:id', validate(updateProductSchema), productController.updateOne);
router.delete('/:id', productController.deleteOne);

export default router;
