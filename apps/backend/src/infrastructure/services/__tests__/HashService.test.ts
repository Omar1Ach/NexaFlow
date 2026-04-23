import { HashService } from '../HashService';

describe('HashService', () => {
  let service: HashService;

  beforeEach(() => {
    // Use low rounds for faster tests
    service = new HashService(4);
  });

  it('should hash a password', async () => {
    const hashed = await service.hash('secret');
    expect(typeof hashed).toBe('string');
    expect(hashed.length).toBeGreaterThan(0);
  });

  it('hashed password should not equal plain password', async () => {
    const plain = 'my-password';
    const hashed = await service.hash(plain);
    expect(hashed).not.toBe(plain);
  });

  it('compare should return true for correct password', async () => {
    const plain = 'correct-pw';
    const hashed = await service.hash(plain);
    await expect(service.compare(plain, hashed)).resolves.toBe(true);
  });

  it('compare should return false for wrong password', async () => {
    const hashed = await service.hash('right');
    await expect(service.compare('wrong', hashed)).resolves.toBe(false);
  });
});
