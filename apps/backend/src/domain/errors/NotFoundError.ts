import { DomainError } from './DomainError';

export class NotFoundError extends DomainError {
  constructor(resource: string, id?: string) {
    super(id ? `${resource} with id '${id}' was not found` : `${resource} was not found`);
  }
}
