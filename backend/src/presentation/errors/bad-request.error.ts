import { PresentationError } from './presentation.error';

export class BadRequestError extends PresentationError {
  constructor(message: string = 'Bad request') {
    super(message, 400);
  }
} 