import { Request, Response } from 'express';
import { z } from 'zod';
import { validate } from '../validate';
import { ValidationError } from '../../../domain/errors/ValidationError';

describe('validate middleware', () => {
  const schema = z.object({
    email: z.string().email(),
    age: z.number().int().positive(),
  });
  const res = {} as Response;
  let next: jest.Mock;

  beforeEach(() => {
    next = jest.fn();
  });

  it('valid body → calls next()', () => {
    const req = { body: { email: 'a@b.com', age: 30 } } as Request;

    validate(schema)(req, res, next);

    expect(next).toHaveBeenCalledTimes(1);
    expect(next).toHaveBeenCalledWith();
  });

  it('invalid body → 400 with error details', () => {
    const req = { body: { email: 'not-email', age: -1 } } as Request;

    validate(schema)(req, res, next);

    expect(next).toHaveBeenCalledTimes(1);
    const err = next.mock.calls[0][0];
    expect(err).toBeInstanceOf(ValidationError);
    expect((err as ValidationError).errors.length).toBeGreaterThan(0);
    expect((err as ValidationError).errors[0]).toHaveProperty('field');
    expect((err as ValidationError).errors[0]).toHaveProperty('message');
  });
});
