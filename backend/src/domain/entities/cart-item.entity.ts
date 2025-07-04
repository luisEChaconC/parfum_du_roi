export class CartItem {
  constructor(
    private _productStockKeepingUnit: string,
    private _quantity: number,
    private _productName?: string,
    private _priceAtTimeOfAdd?: number,
  ) {}

  public get productStockKeepingUnit(): string {
    return this._productStockKeepingUnit;
  }

  public get quantity(): number {
    return this._quantity;
  }

  public get priceAtTimeOfAdd(): number | undefined {
    return this._priceAtTimeOfAdd;
  }

  public get productName(): string | undefined {
    return this._productName;
  }

  public getSubtotalPrice(): number | undefined {
    if (!this._priceAtTimeOfAdd) {
      return undefined;
    }
    return this._quantity * this._priceAtTimeOfAdd;
  }
}
