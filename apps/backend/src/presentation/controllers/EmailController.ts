import { NextFunction, Request, Response } from 'express';
import { TriggerEmailUseCase } from '../../application/use-cases/email/TriggerEmailUseCase';

export class EmailController {
  constructor(private readonly triggerEmailUseCase: TriggerEmailUseCase) {}

  trigger = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const data = await this.triggerEmailUseCase.execute(req.body);
      res.status(202).json({ success: true, data, message: 'Email triggered' });
    } catch (err) {
      next(err);
    }
  };
}
