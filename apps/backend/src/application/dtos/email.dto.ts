export interface TriggerEmailInputDTO {
  to: string;
  subject: string;
  body: string;
  metadata?: Record<string, unknown>;
}

export interface TriggerEmailOutputDTO {
  triggered: true;
}
