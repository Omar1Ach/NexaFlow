// Global error handler middleware — catches all unhandled errors
import { NextFunction, Request, Response } from 'express';

interface ErrorWithStatus extends Error {
  status?: number;
}

export function errorHandler(
  err: ErrorWithStatus,
  _req: Request,
  res: Response,
  _next: NextFunction
): void {
  const status = err.status && Number.isInteger(err.status) ? err.status : 500;
  const response: { success: boolean; message: string; stack?: string } = {
    success: false,
    message: err.message || 'Internal Server Error',
  };

  if (process.env.NODE_ENV !== 'production') {
    response.stack = err.stack;
  }

  res.status(status).json(response);
}

export default errorHandler;
