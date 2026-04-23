import { NextFunction, Request, Response } from 'express';
import { LoginUseCase } from '../../application/use-cases/auth/LoginUseCase';
import { RegisterUseCase } from '../../application/use-cases/auth/RegisterUseCase';

export class AuthController {
  constructor(
    private readonly loginUseCase: LoginUseCase,
    private readonly registerUseCase: RegisterUseCase,
  ) {}

  login = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const data = await this.loginUseCase.execute(req.body);
      res.status(200).json({ success: true, data, message: 'Login successful' });
    } catch (err) {
      next(err);
    }
  };

  register = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const data = await this.registerUseCase.execute(req.body);
      res.status(201).json({ success: true, data, message: 'Registration successful' });
    } catch (err) {
      next(err);
    }
  };
}
