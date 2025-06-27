export class CartItem {
  constructor(
    private _productId: string,
    private _quantity: number,
    private _priceAtTimeOfAdd: number,
    private _productName: string,
  ) {
    this.validateCartItem(this._productId, this._quantity, this._priceAtTimeOfAdd, this._productName);
  }

  public get productId(): string {
    return this._productId;
  }

  public get quantity(): number {
    return this._quantity;
  }

  public get priceAtTimeOfAdd(): number {
    return this._priceAtTimeOfAdd;
  }

  public get productName(): string {
    return this._productName;
  }

  public getSubtotal(): number {
    return this._quantity * this._priceAtTimeOfAdd;
  }

  private validateCartItem(productId: string, quantity: number, priceAtTimeOfAdd: number, productName: string): void {
    if (!productId || !productName) {
      throw new Error('Product ID and name are required');
    }
    if (quantity <= 0) {
      throw new Error('Quantity must be greater than 0');
    }
    if (priceAtTimeOfAdd < 0) {
      throw new Error('Price cannot be negative');
    }
  }
}
