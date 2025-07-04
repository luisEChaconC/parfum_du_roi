import { Cart } from "@entity/cart.entity";
import { CartItem } from "@entity/cart-item.entity";

class CartItemDto {
  constructor(
    public readonly productStockKeepingUnit: string,
    public readonly quantity: number,
    public readonly productName?: string,
    public readonly priceAtTimeOfAdd?: number,
  ) {}

  static fromDomain(item: CartItem): CartItemDto {
    return new CartItemDto(
      item.productStockKeepingUnit,
      item.quantity,
      item.productName,
      item.priceAtTimeOfAdd,
    );
  }
}
export class GetCartResponseDto {
  constructor(
    public readonly items: CartItemDto[],
    public readonly totalItems: number,
    public readonly totalPrice: number,
  ) {}

  static fromDomain(cart: Cart): GetCartResponseDto {
    return new GetCartResponseDto(
      cart.items.map(item => CartItemDto.fromDomain(item)),
      cart.getTotalItems(),
      cart.getTotalPrice(),
    );
  }
}
