import { Product } from "./product.entity";

export class CartItem {
  constructor(
    private _product: Product,
    private _quantity: number,
  ) {}

  public get product(): Product {
    return this._product;
  }

  public get quantity(): number {
    return this._quantity;
  }

  public getSubtotalPrice(): number {
    return this._quantity * this._product.price;
  }
}
