import { LoginUseCase } from '../LoginUseCase';
import { IUserRepository } from '../../../../domain/repositories/IUserRepository';
import { IHashService } from '../../../../domain/services/IHashService';
import { IJwtService } from '../../../../domain/services/IJwtService';
import { UnauthorizedError } from '../../../../domain/errors/UnauthorizedError';
import { User } from '../../../../domain/entities/User';

describe('LoginUseCase', () => {
  let userRepository: jest.Mocked<IUserRepository>;
  let hashService: jest.Mocked<IHashService>;
  let jwtService: jest.Mocked<IJwtService>;
  let useCase: LoginUseCase;

  const fakeUser: User = {
    id: 'user-1',
    email: 'a@b.com',
    password: 'hashed-password',
    name: 'Alice',
    role: 'USER',
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  beforeEach(() => {
    userRepository = {
      findByEmail: jest.fn(),
      findById: jest.fn(),
      create: jest.fn(),
    };
    hashService = { hash: jest.fn(), compare: jest.fn() };
    jwtService = { sign: jest.fn(), verify: jest.fn() };
    useCase = new LoginUseCase(userRepository, hashService, jwtService);
  });

  it('should return token when credentials valid', async () => {
    userRepository.findByEmail.mockResolvedValue(fakeUser);
    hashService.compare.mockResolvedValue(true);
    jwtService.sign.mockReturnValue('signed-token');

    const result = await useCase.execute({ email: 'a@b.com', password: 'pw' });

    expect(result.token).toBe('signed-token');
    expect(result.user).toEqual({
      id: 'user-1',
      email: 'a@b.com',
      name: 'Alice',
      role: 'USER',
    });
    expect(jwtService.sign).toHaveBeenCalledWith({
      id: 'user-1',
      email: 'a@b.com',
      role: 'USER',
    });
  });

  it('should throw UnauthorizedError when user not found', async () => {
    userRepository.findByEmail.mockResolvedValue(null);

    await expect(useCase.execute({ email: 'x@y.z', password: 'p' })).rejects.toThrow(
      UnauthorizedError,
    );
    expect(hashService.compare).not.toHaveBeenCalled();
    expect(jwtService.sign).not.toHaveBeenCalled();
  });

  it('should throw UnauthorizedError when password wrong', async () => {
    userRepository.findByEmail.mockResolvedValue(fakeUser);
    hashService.compare.mockResolvedValue(false);

    await expect(useCase.execute({ email: 'a@b.com', password: 'bad' })).rejects.toThrow(
      UnauthorizedError,
    );
    expect(jwtService.sign).not.toHaveBeenCalled();
  });
});
