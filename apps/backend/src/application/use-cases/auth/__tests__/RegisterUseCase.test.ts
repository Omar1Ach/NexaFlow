import { RegisterUseCase } from '../RegisterUseCase';
import { IUserRepository } from '../../../../domain/repositories/IUserRepository';
import { IHashService } from '../../../../domain/services/IHashService';
import { ValidationError } from '../../../../domain/errors/ValidationError';
import { User } from '../../../../domain/entities/User';

describe('RegisterUseCase', () => {
  let userRepository: jest.Mocked<IUserRepository>;
  let hashService: jest.Mocked<IHashService>;
  let useCase: RegisterUseCase;

  beforeEach(() => {
    userRepository = {
      findByEmail: jest.fn(),
      findById: jest.fn(),
      create: jest.fn(),
    };
    hashService = { hash: jest.fn(), compare: jest.fn() };
    useCase = new RegisterUseCase(userRepository, hashService);
  });

  it('should create user and return data', async () => {
    userRepository.findByEmail.mockResolvedValue(null);
    hashService.hash.mockResolvedValue('hashed-pw');
    const created: User = {
      id: 'u-1',
      email: 'new@x.com',
      password: 'hashed-pw',
      name: 'New',
      role: 'USER',
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    userRepository.create.mockResolvedValue(created);

    const result = await useCase.execute({
      email: 'new@x.com',
      password: 'plain-password',
      name: 'New',
    });

    expect(hashService.hash).toHaveBeenCalledWith('plain-password');
    expect(userRepository.create).toHaveBeenCalledWith({
      email: 'new@x.com',
      password: 'hashed-pw',
      name: 'New',
      role: 'USER',
    });
    expect(result.user).toEqual({
      id: 'u-1',
      email: 'new@x.com',
      name: 'New',
      role: 'USER',
    });
  });

  it('should throw ValidationError if email already exists', async () => {
    userRepository.findByEmail.mockResolvedValue({
      id: 'x',
      email: 'taken@x.com',
      password: 'h',
      name: 'n',
      role: 'USER',
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    await expect(
      useCase.execute({ email: 'taken@x.com', password: 'p', name: 'n' }),
    ).rejects.toThrow(ValidationError);
    expect(hashService.hash).not.toHaveBeenCalled();
    expect(userRepository.create).not.toHaveBeenCalled();
  });
});
