import { PresentationError } from './presentation.error';

export class InternalServerError extends PresentationError {
  constructor(message: string = 'An unexpected error occurred.') {
    super(message, 500);
  }
} 