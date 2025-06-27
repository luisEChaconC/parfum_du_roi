import { DomainError } from "./domain.error";

export class InvalidUserDataError extends DomainError {
  constructor(message: string = 'Invalid user data') {
    super(message);
  }
} 