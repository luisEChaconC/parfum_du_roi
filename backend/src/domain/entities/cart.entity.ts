import { CartItem } from './cart-item.entity';

export class Cart {
  constructor(
    private _userId: string,
    private _items: CartItem[],
  ) {}

  public get userId(): string {
    return this._userId;
  }

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
