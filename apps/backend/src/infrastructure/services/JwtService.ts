import jwt, { JsonWebTokenError, SignOptions } from 'jsonwebtoken';
import { IJwtService, JwtPayload } from '../../domain/services/IJwtService';
import { UnauthorizedError } from '../../domain/errors/UnauthorizedError';

export class JwtService implements IJwtService {
  constructor(
    private readonly secret: string,
    private readonly expiresIn: string,
  ) {}

  sign(payload: JwtPayload): string {
    const options: SignOptions = {
      expiresIn: this.expiresIn as SignOptions['expiresIn'],
    };
    return jwt.sign(payload, this.secret, options);
  }

  verify(token: string): JwtPayload {
    try {
      const decoded = jwt.verify(token, this.secret);
      if (typeof decoded !== 'object' || decoded === null) {
        throw new UnauthorizedError('Invalid token');
      }
      const { id, email, role } = decoded as Partial<JwtPayload>;
      if (typeof id !== 'string' || typeof email !== 'string' || (role !== 'ADMIN' && role !== 'USER')) {
        throw new UnauthorizedError('Invalid token');
      }
      return { id, email, role };
    } catch (err) {
      if (err instanceof UnauthorizedError) throw err;
      if (err instanceof JsonWebTokenError) {
        throw new UnauthorizedError('Invalid token');
      }
      throw new UnauthorizedError('Invalid token');
    }
  }
}
