import { CartItem } from "@entity/cart-item.entity";
import { Cart } from "@entity/cart.entity";

export class CartItemDto {
  constructor(
    public readonly productId: string,
    public readonly quantity: number,
  ) {}
}

export class CreateCartRequestDto {
  constructor(
    public readonly items: CartItemDto[],
  ) {}

  static toDomain(dto: CreateCartRequestDto, userId: string, cartItems: CartItem[]): Cart {
    return new Cart(
      userId,
      cartItems,
    );
  }
}