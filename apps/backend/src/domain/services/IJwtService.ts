export interface JwtPayload {
  id: string;
  email: string;
  role: 'ADMIN' | 'USER';
}

export interface IJwtService {
  sign(payload: JwtPayload): string;
  verify(token: string): JwtPayload;
}
