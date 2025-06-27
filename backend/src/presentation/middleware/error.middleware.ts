import { Request, Response, NextFunction } from 'express';
import { PresentationError } from '@presentation/errors/presentation.error';
import { InternalServerError } from '@presentation/errors/InternalServerError';

const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof PresentationError) {
    res.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    });
    return;
  }

  // For unexpected errors, log them
  console.error('UNHANDLED_ERROR:', err);

  // Wrap unexpected errors in InternalServerError
  const internalError = new InternalServerError(err.message); // Use original error message

  res.status(internalError.statusCode).json({
    status: 'error',
    message: internalError.message,
  });
};

export { errorHandler }; 