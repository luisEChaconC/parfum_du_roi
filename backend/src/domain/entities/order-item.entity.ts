export class OrderItem {
  private _productId: string;
  private _quantity: number;

  constructor(productId: string, quantity: number) {
    this._productId = productId;
    this._quantity = quantity;
  }
}
