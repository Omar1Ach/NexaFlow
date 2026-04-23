import { TriggerEmailUseCase } from '../TriggerEmailUseCase';
import { IN8nService } from '../../../../domain/services/IN8nService';
import { DomainError } from '../../../../domain/errors/DomainError';

describe('TriggerEmailUseCase', () => {
  let n8n: jest.Mocked<IN8nService>;
  let useCase: TriggerEmailUseCase;

  beforeEach(() => {
    n8n = { triggerEmail: jest.fn() };
    useCase = new TriggerEmailUseCase(n8n);
  });

  it('should call n8n webhook with correct payload', async () => {
    n8n.triggerEmail.mockResolvedValue(undefined);

    const result = await useCase.execute({
      to: 'user@x.com',
      subject: 'Hi',
      body: 'Body',
      metadata: { foo: 'bar' },
    });

    expect(n8n.triggerEmail).toHaveBeenCalledWith({
      to: 'user@x.com',
      subject: 'Hi',
      body: 'Body',
      metadata: { foo: 'bar' },
    });
    expect(result).toEqual({ triggered: true });
  });

  it('should throw DomainError if webhook call fails', async () => {
    n8n.triggerEmail.mockRejectedValue(new DomainError('Failed to trigger n8n email webhook'));

    await expect(
      useCase.execute({ to: 'a@b.c', subject: 's', body: 'b' }),
    ).rejects.toThrow(DomainError);
  });
});
