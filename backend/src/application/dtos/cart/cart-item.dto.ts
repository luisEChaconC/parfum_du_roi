import { CartItem } from "@entity/cart-item.entity";

export class CartItemDto {
  constructor(
    public readonly productStockKeepingUnit: string,
    public readonly productName: string,
    public readonly quantity: number,
    public readonly priceAtTimeOfAdd: number,
  ) {}

  static fromDomain(item: CartItem): CartItemDto {
    return new CartItemDto(
      item.productStockKeepingUnit,
      item.productName,
      item.quantity,
      item.priceAtTimeOfAdd,
    );
  }

  static toDomain(dto: CartItemDto): CartItem {
    return new CartItem(
      dto.productStockKeepingUnit,
      dto.productName,
      dto.quantity,
      dto.priceAtTimeOfAdd,
    );
  }
}
