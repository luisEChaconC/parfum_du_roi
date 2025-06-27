import { PresentationError } from './presentation.error';

export class ConflictError extends PresentationError {
  constructor(message: string = 'Conflict') {
    super(message, 409);
  }
} 