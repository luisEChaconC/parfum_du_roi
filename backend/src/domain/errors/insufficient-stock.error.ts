import { DomainError } from "./domain.error";

export class InsufficientStockError extends DomainError {
  constructor(productName: string, requestedQuantity: number, availableStock: number) {
    super(`Insufficient stock for ${productName}. Requested: ${requestedQuantity}, Available: ${availableStock}`);
  }
}