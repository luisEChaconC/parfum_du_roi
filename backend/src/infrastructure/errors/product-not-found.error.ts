export class ProductNotFoundError extends Error {
  constructor(
    public readonly missingSKUs: string[],
    message?: string
  ) {
    super(message || `Products not found for SKUs: ${missingSKUs.join(', ')}`);
    this.name = 'ProductNotFoundError';
  }
} 