import { DomainError } from './DomainError';

export class UnauthorizedError extends DomainError {
  constructor(message = 'Unauthorized') {
    super(message);
  }
}
