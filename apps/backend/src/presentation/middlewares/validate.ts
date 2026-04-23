import { NextFunction, Request, RequestHandler, Response } from 'express';
import { ZodError, ZodSchema } from 'zod';
import { ValidationError } from '../../domain/errors/ValidationError';

export function validate(schema: ZodSchema): RequestHandler {
  return (req: Request, _res: Response, next: NextFunction): void => {
    const result = schema.safeParse(req.body);
    if (result.success) {
      req.body = result.data;
      next();
      return;
    }

    const zodErr: ZodError = result.error;
    const fieldErrors = zodErr.errors.map((e) => ({
      field: e.path.join('.'),
      message: e.message,
    }));
    next(new ValidationError('Validation failed', fieldErrors));
  };
}

export default validate;
