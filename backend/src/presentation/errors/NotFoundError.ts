import { PresentationError } from './presentation.error';

export class NotFoundError extends PresentationError {
  constructor(message: string = 'Resource not found') {
    super(message, 404);
  }
} 