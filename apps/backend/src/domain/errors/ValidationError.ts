import { DomainError } from './DomainError';

export interface FieldError {
  field: string;
  message: string;
}

export class ValidationError extends DomainError {
  public readonly errors: FieldError[];

  constructor(message: string, errors: FieldError[] = []) {
    super(message);
    this.errors = errors;
  }
}
