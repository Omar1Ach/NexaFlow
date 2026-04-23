import { Router } from 'express';
import { container } from '../../infrastructure/container';
import { validate } from '../middlewares/validate';
import { createCategorySchema, updateCategorySchema } from '../schemas/category.schema';

const router = Router();
const { categoryController } = container.controllers;

router.get('/', categoryController.list);
router.get('/:id', categoryController.findOne);
router.post('/', validate(createCategorySchema), categoryController.createOne);
router.put('/:id', validate(updateCategorySchema), categoryController.updateOne);
router.delete('/:id', categoryController.deleteOne);

export default router;
