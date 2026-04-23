// Express application setup with security and logging middleware
import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import morgan from 'morgan';
import router from './presentation/routes/index';
import { errorHandler } from './presentation/middlewares/errorHandler';
import { env } from './config/env';

const app = express();

// Middleware order: security → CORS → logging → body parsing
app.use(helmet());
app.use(
  cors({
    origin: env.FRONTEND_URL,
  })
);
app.use(morgan('dev'));
app.use(express.json());

// API routes
app.use('/api/v1', router);

// Global error handler (must be the last middleware)
app.use(errorHandler);

export default app;
