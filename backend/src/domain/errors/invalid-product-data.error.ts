import { DomainError } from "./domain.error";

export class InvalidProductDataError extends DomainError {
  constructor(message: string = 'Invalid product data') {
    super(message);
  }
}
