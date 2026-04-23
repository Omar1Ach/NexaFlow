import { Request, Response } from 'express';
import { errorHandler } from '../errorHandler';
import { NotFoundError } from '../../../domain/errors/NotFoundError';
import { ValidationError } from '../../../domain/errors/ValidationError';
import { UnauthorizedError } from '../../../domain/errors/UnauthorizedError';

function makeRes(): Response {
  const res: Partial<Response> = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res as Response;
}

describe('errorHandler', () => {
  const req = {} as Request;
  const next = jest.fn();
  const ORIGINAL_ENV = process.env.NODE_ENV;

  afterEach(() => {
    process.env.NODE_ENV = ORIGINAL_ENV;
  });

  it('NotFoundError → 404 response', () => {
    const res = makeRes();
    errorHandler(new NotFoundError('Thing', 'abc'), req, res, next);
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({ success: false, message: expect.stringContaining('Thing') }),
    );
  });

  it('ValidationError → 400 response', () => {
    const res = makeRes();
    const fields = [{ field: 'email', message: 'bad' }];
    errorHandler(new ValidationError('Validation failed', fields), req, res, next);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({ success: false, message: 'Validation failed', errors: fields }),
    );
  });

  it('UnauthorizedError → 401 response', () => {
    const res = makeRes();
    errorHandler(new UnauthorizedError('nope'), req, res, next);
    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({ success: false, message: 'nope' }),
    );
  });

  it('unknown error → 500 response', () => {
    const res = makeRes();
    errorHandler(new Error('boom'), req, res, next);
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({ success: false, message: 'boom' }),
    );
  });

  it('stack hidden in production', () => {
    process.env.NODE_ENV = 'production';
    const res = makeRes();
    errorHandler(new Error('secret'), req, res, next);
    const jsonMock = res.json as jest.Mock;
    const body = jsonMock.mock.calls[0][0];
    expect(body).not.toHaveProperty('stack');
  });
});
