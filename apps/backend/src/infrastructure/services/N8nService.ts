import axios, { AxiosInstance } from 'axios';
import { IN8nService, N8nEmailPayload } from '../../domain/services/IN8nService';
import { DomainError } from '../../domain/errors/DomainError';

export class N8nService implements IN8nService {
  private readonly http: AxiosInstance;

  constructor(
    private readonly webhookUrl: string,
    http?: AxiosInstance,
  ) {
    this.http = http ?? axios.create();
  }

  async triggerEmail(payload: N8nEmailPayload): Promise<void> {
    try {
      await this.http.post(this.webhookUrl, payload);
    } catch {
      throw new DomainError('Failed to trigger n8n email webhook');
    }
  }
}
