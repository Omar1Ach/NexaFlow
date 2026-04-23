import { JwtService } from '../JwtService';
import { UnauthorizedError } from '../../../domain/errors/UnauthorizedError';
import { JwtPayload } from '../../../domain/services/IJwtService';

describe('JwtService', () => {
  const secret = 'test-secret-key';
  const expiresIn = '1h';
  const payload: JwtPayload = { id: 'u-1', email: 'a@b.c', role: 'USER' };
  let service: JwtService;

  beforeEach(() => {
    service = new JwtService(secret, expiresIn);
  });

  it('should sign and return valid token', () => {
    const token = service.sign(payload);
    expect(typeof token).toBe('string');
    expect(token.split('.')).toHaveLength(3);
  });

  it('should verify valid token and return payload', () => {
    const token = service.sign(payload);
    const decoded = service.verify(token);
    expect(decoded).toMatchObject(payload);
  });

  it('should throw UnauthorizedError for invalid token', () => {
    expect(() => service.verify('not.a.jwt')).toThrow(UnauthorizedError);
  });
});
