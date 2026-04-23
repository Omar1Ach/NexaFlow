// API v1 router — mounts all feature routes
import { Router } from 'express';

const router = Router();

// Health check endpoint
router.get('/health', (_req, res) => {
  res.json({ success: true, message: 'API is running' });
});

// Mount feature routes below:
// router.use('/auth', authRouter);
// router.use('/users', userRouter);
// router.use('/categories', categoryRouter);
// router.use('/products', productRouter);
// router.use('/suppliers', supplierRouter);

export default router;
