import { CartItem } from './cart-item.entity';

export class Cart {
  constructor(
    private _id: string,
    private _customerId: string,
    private _items: CartItem[],
  ) {}

  public get id(): string {
    return this._id;
  }

  public get customerId(): string {
    return this._customerId;
  }

  public get items(): CartItem[] {
    return this._items;
  }

  public addItem(item: CartItem): void {
    // Undefined if item is not found
    const existingItem: CartItem | undefined = this._items.find(i => i.productId === item.productId);

    if (existingItem) {
      const updatedItem = new CartItem(
        existingItem.productId,
        existingItem.quantity + item.quantity,
        existingItem.priceAtTimeOfAdd,
        existingItem.productName
      );
      this._items = this._items.map(i => i.productId === item.productId ? updatedItem : i);
    } else {
      this._items.push(item);
    }
  }

  public removeItem(productId: string): void {
    this._items = this._items.filter(item => item.productId !== productId);
  }

  public updateItemQuantity(productId: string, quantity: number): void {
    const item = this._items.find(i => i.productId === productId);

    if (item) {
      if (quantity <= 0) {
        this.removeItem(productId);
      } else {
        const updatedItem = new CartItem(item.productId, quantity, item.priceAtTimeOfAdd, item.productName);
        this._items = this._items.map(i => i.productId === productId ? updatedItem : i);
      }
    }
  }

  public clearCart(): void {
    this._items = [];
  }

  public getTotalItems(): number {
    return this._items.reduce((total, item) => total + item.quantity, 0);
  }

  public hasItem(productId: string): boolean {
    return this._items.some(item => item.productId === productId);
  }

  public getItemQuantity(productId: string): number {
    const item = this._items.find(i => i.productId === productId);
    return item ? item.quantity : 0;
  }

  public isEmpty(): boolean {
    return this._items.length === 0;
  }
}
