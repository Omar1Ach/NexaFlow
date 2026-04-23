import { IUserRepository } from '../../../domain/repositories/IUserRepository';
import { IHashService } from '../../../domain/services/IHashService';
import { ValidationError } from '../../../domain/errors/ValidationError';
import { RegisterInputDTO, RegisterOutputDTO } from '../../dtos/auth.dto';

export class RegisterUseCase {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly hashService: IHashService,
  ) {}

  async execute(input: RegisterInputDTO): Promise<RegisterOutputDTO> {
    const existing = await this.userRepository.findByEmail(input.email);
    if (existing) {
      throw new ValidationError('Email already in use', [
        { field: 'email', message: 'Email already in use' },
      ]);
    }

    const hashed = await this.hashService.hash(input.password);

    const user = await this.userRepository.create({
      email: input.email,
      password: hashed,
      name: input.name,
      role: input.role ?? 'USER',
    });

    return {
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
    };
  }
}
