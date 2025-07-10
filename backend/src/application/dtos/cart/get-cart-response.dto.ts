import { Cart } from "@entity/cart.entity";
import { CartItem } from "@entity/cart-item.entity";

class CartItemDto {
  constructor(
    public readonly productId: string,
    public readonly productName: string,
    public readonly priceAtTimeOfAdd: number,
    public readonly quantity: number,
  ) {}

  static fromDomain(item: CartItem): CartItemDto {
    return new CartItemDto(
      item.product.id,
      item.product.name,
      item.product.price,
      item.quantity,
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
