import { CartItem } from './cart-item.entity';

export class Cart {
  constructor(
    private _items: CartItem[],
  ) {}

  public get items(): CartItem[] {
    return this._items;
  }

  public getTotalItems(): number {
    return this._items.reduce((total, item) => total + item.quantity, 0)
  }

  public getTotalPrice(): number {
    return this._items.reduce((total, item) => total + item.getSubtotalPrice(), 0)
  }
} 
