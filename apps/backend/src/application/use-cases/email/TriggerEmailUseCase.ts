import { IN8nService } from '../../../domain/services/IN8nService';
import { TriggerEmailInputDTO, TriggerEmailOutputDTO } from '../../dtos/email.dto';

export class TriggerEmailUseCase {
  constructor(private readonly n8nService: IN8nService) {}

  async execute(input: TriggerEmailInputDTO): Promise<TriggerEmailOutputDTO> {
    await this.n8nService.triggerEmail({
      to: input.to,
      subject: input.subject,
      body: input.body,
      metadata: input.metadata,
    });
    return { triggered: true };
  }
}
