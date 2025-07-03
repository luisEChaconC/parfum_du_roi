export class CartItem {
  constructor(
    private _productStockKeepingUnit: string,
    private _productName: string,
    private _quantity: number,
    private _priceAtTimeOfAdd: number,
  ) {}

  public get productStockKeepingUnit(): string {
    return this._productStockKeepingUnit;
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

  public getSubtotalPrice(): number {
    return this._quantity * this._priceAtTimeOfAdd;
  }
}
