export class CartItem {
  constructor(
    private _productId: string,
    private _productName: string,
    private _priceAtTimeOfAdd: number,
    private _quantity: number,
  ) {}

  public get productId(): string {
    return this._productId;
  }

  public get productName(): string {
    return this._productName;
  }
  
    public get priceAtTimeOfAdd(): number {
      return this._priceAtTimeOfAdd;
    }

  public get quantity(): number {
    return this._quantity;
  }

  public getSubtotalPrice(): number {
    return this._quantity * this._priceAtTimeOfAdd;
  }
}
