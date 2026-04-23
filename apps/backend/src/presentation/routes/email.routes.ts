import { Router } from 'express';
import { container } from '../../infrastructure/container';
import { validate } from '../middlewares/validate';
import { triggerEmailSchema } from '../schemas/supplier.schema';

const router = Router();
const { emailController } = container.controllers;

router.post('/trigger', validate(triggerEmailSchema), emailController.trigger);

export default router;
