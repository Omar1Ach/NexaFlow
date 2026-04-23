import { NextFunction, Request, Response } from 'express';
import { DomainError } from '../../domain/errors/DomainError';
import { NotFoundError } from '../../domain/errors/NotFoundError';
import { ValidationError } from '../../domain/errors/ValidationError';
import { UnauthorizedError } from '../../domain/errors/UnauthorizedError';

interface ErrorResponse {
  success: false;
  message: string;
  errors?: unknown[];
  stack?: string;
}

export function errorHandler(
  err: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction,
): void {
  const isProd = process.env.NODE_ENV === 'production';

  let status = 500;
  let message = 'Internal Server Error';
  let errors: unknown[] | undefined;

  if (err instanceof NotFoundError) {
    status = 404;
    message = err.message;
  } else if (err instanceof ValidationError) {
    status = 400;
    message = err.message;
    errors = err.errors;
  } else if (err instanceof UnauthorizedError) {
    status = 401;
    message = err.message;
  } else if (err instanceof DomainError) {
    status = 500;
    message = err.message;
  } else if (err instanceof Error) {
    message = err.message || message;
  }

  const body: ErrorResponse = { success: false, message };
  if (errors !== undefined) body.errors = errors;
  if (!isProd && err instanceof Error && err.stack) body.stack = err.stack;

  res.status(status).json(body);
}

export default errorHandler;
