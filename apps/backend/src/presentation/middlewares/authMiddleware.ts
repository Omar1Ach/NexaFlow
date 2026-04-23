import { NextFunction, Request, RequestHandler, Response } from 'express';
import { IJwtService, JwtPayload } from '../../domain/services/IJwtService';
import { UnauthorizedError } from '../../domain/errors/UnauthorizedError';

declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload;
    }
  }
}

export function createAuthMiddleware(jwtService: IJwtService): RequestHandler {
  return (req: Request, _res: Response, next: NextFunction): void => {
    try {
      const header = req.headers.authorization;
      if (!header || !header.startsWith('Bearer ')) {
        throw new UnauthorizedError('Missing or malformed Authorization header');
      }
      const token = header.slice('Bearer '.length).trim();
      if (!token) {
        throw new UnauthorizedError('Missing token');
      }
      req.user = jwtService.verify(token);
      next();
    } catch (err) {
      next(err);
    }
  };
}
