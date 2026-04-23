// Zod validation middleware factory — validates request body against a schema
import { NextFunction, Request, Response } from 'express';
import { ZodSchema, ZodError } from 'zod';

/**
 * Returns a middleware that validates req.body against the given Zod schema.
 * On failure, responds with 400 and structured field-level errors.
 */
export function validate(schema: ZodSchema) {
  return (req: Request, res: Response, next: NextFunction): void => {
    try {
      schema.parse(req.body);
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const fieldErrors = error.errors.map((e) => ({
          field: e.path.join('.'),
          message: e.message,
        }));
        res.status(400).json({
          success: false,
          message: 'Validation failed',
          errors: fieldErrors,
        });
        return;
      }
      next(error);
    }
  };
}

export default validate;
