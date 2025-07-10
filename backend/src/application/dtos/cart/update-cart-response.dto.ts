import { CartItem } from "@entity/cart-item.entity";
import { Cart } from "@entity/cart.entity";

export class CartItemDto {
  constructor(
    public readonly productId: string,
    public readonly productName: string,
    public readonly price: number,
    public readonly quantity: number,
  ) {}

  static fromDomain(item: CartItem): CartItemDto {
    return new CartItemDto(item.product.id, item.product.name, item.product.price, item.quantity);
  }
}

export class UpdateCartResponseDto {
  constructor(
    public readonly items: CartItemDto[],
  ) {}

  static fromDomain(cart: Cart): UpdateCartResponseDto {
    return new UpdateCartResponseDto(cart.items.map(CartItemDto.fromDomain));
  }
}
