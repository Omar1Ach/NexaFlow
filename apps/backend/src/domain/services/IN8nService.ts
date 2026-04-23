export interface N8nEmailPayload {
  to: string;
  subject: string;
  body: string;
  metadata?: Record<string, unknown>;
}

export interface IN8nService {
  triggerEmail(payload: N8nEmailPayload): Promise<void>;
}
