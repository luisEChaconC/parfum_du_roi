import { OrderItem } from './order-item.entity';

export enum OrderStatus {
  PENDING = 'pending',
  PROCESSING = 'processing',
  SHIPPED = 'shipped',
  DELIVERED = 'delivered',
  CANCELLED = 'cancelled'
}

export class Order {
  private _id: string;
  private _customerId: string;
  private _orderDate: Date;
  private _totalAmount: number;
  private _status: OrderStatus;
  private _items: OrderItem[];
  private _createdAt: Date;
  private _updatedAt: Date;

  constructor(
    id: string,
    customerId: string,
    orderDate: Date,
    totalAmount: number,
    status: OrderStatus,
    items: OrderItem[],
    createdAt: Date,
    updatedAt: Date
  ) {
    this._id = id;
    this._customerId = customerId;
    this._orderDate = orderDate;
    this._totalAmount = totalAmount;
    this._status = status;
    this._items = items;
    this._createdAt = createdAt;
    this._updatedAt = updatedAt;
  }
}
