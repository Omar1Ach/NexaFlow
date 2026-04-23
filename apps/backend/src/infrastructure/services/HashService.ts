import bcrypt from 'bcryptjs';
import { IHashService } from '../../domain/services/IHashService';

export class HashService implements IHashService {
  constructor(private readonly rounds = 10) {}

  async hash(plain: string): Promise<string> {
    return bcrypt.hash(plain, this.rounds);
  }

  async compare(plain: string, hashed: string): Promise<boolean> {
    return bcrypt.compare(plain, hashed);
  }
}
