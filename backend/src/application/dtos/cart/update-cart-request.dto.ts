import { CartItem } from "@entity/cart-item.entity";
import { Cart } from "@entity/cart.entity";

export class CartItemDto {
  constructor(
    public readonly productId: string,
    public readonly quantity: number,
  ) {}
}

export class UpdateCartRequestDto {
  constructor(
    public readonly items: CartItemDto[],
  ) {}

  static toDomain(dto: UpdateCartRequestDto, userId: string, cartItems: CartItem[]): Cart {
    return new Cart(
      userId,
      cartItems,
    );
  }
}