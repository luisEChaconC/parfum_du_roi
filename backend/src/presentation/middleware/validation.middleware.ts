import { Request, Response, NextFunction } from 'express';
import { validate, ValidationError } from 'class-validator';
import { plainToClass } from 'class-transformer';
import { BadRequestError } from '@presentation/errors/bad-request.error';

function validationMiddleware<T>(type: any, skipMissingProperties = false) {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const dto = plainToClass(type, req.body as Record<string, any>);
      const errors: ValidationError[] = await validate(dto as object, { skipMissingProperties });

      if (errors.length > 0) {
        const message = errors.map((error: ValidationError) => Object.values(error.constraints || {})).join(', ');
        next(new BadRequestError(message));
      } else {
        req.body = dto;
        next();
      }
    } catch (error) {
      next(error);
    }
  };
}

export { validationMiddleware }; 