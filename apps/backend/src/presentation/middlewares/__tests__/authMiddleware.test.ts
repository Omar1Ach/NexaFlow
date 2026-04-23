import { Request, Response } from 'express';
import { createAuthMiddleware } from '../authMiddleware';
import { IJwtService } from '../../../domain/services/IJwtService';
import { UnauthorizedError } from '../../../domain/errors/UnauthorizedError';

describe('authMiddleware', () => {
  let jwtService: jest.Mocked<IJwtService>;
  let next: jest.Mock;
  const res = {} as Response;

  beforeEach(() => {
    jwtService = { sign: jest.fn(), verify: jest.fn() };
    next = jest.fn();
  });

  it('valid token → calls next()', () => {
    jwtService.verify.mockReturnValue({ id: 'u', email: 'e', role: 'USER' });
    const req = {
      headers: { authorization: 'Bearer valid-token' },
    } as unknown as Request;

    createAuthMiddleware(jwtService)(req, res, next);

    expect(next).toHaveBeenCalledTimes(1);
    expect(next).toHaveBeenCalledWith();
    expect(req.user).toEqual({ id: 'u', email: 'e', role: 'USER' });
  });

  it('missing token → 401', () => {
    const req = { headers: {} } as unknown as Request;

    createAuthMiddleware(jwtService)(req, res, next);

    expect(next).toHaveBeenCalledTimes(1);
    expect(next.mock.calls[0][0]).toBeInstanceOf(UnauthorizedError);
  });

  it('invalid token → 401', () => {
    jwtService.verify.mockImplementation(() => {
      throw new UnauthorizedError('Invalid token');
    });
    const req = {
      headers: { authorization: 'Bearer bad-token' },
    } as unknown as Request;

    createAuthMiddleware(jwtService)(req, res, next);

    expect(next).toHaveBeenCalledTimes(1);
    expect(next.mock.calls[0][0]).toBeInstanceOf(UnauthorizedError);
  });
});
