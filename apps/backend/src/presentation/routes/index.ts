import { Router } from 'express';
import { container } from '../../infrastructure/container';
import { createAuthMiddleware } from '../middlewares/authMiddleware';
import authRoutes from './auth.routes';
import categoryRoutes from './category.routes';
import productRoutes from './product.routes';
import supplierRoutes from './supplier.routes';
import emailRoutes from './email.routes';

const router = Router();

router.get('/health', (_req, res) => {
  res.json({ success: true, data: null, message: 'API is running' });
});

// Public routes
router.use('/auth', authRoutes);

// Protected routes
const authGuard = createAuthMiddleware(container.services.jwtService);
router.use('/categories', authGuard, categoryRoutes);
router.use('/products', authGuard, productRoutes);
router.use('/suppliers', authGuard, supplierRoutes);
router.use('/email', authGuard, emailRoutes);

export default router;
