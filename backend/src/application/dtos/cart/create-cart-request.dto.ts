import { CartItem } from "@entity/cart-item.entity";
import { Cart } from "@entity/cart.entity";

class CartItemDto {
  constructor(
    public readonly productStockKeepingUnit: string,
    public readonly quantity: number,
  ) {}

  static toDomain(dto: CartItemDto): CartItem {
    return new CartItem(
      dto.productStockKeepingUnit,
      dto.quantity
    );
  }
}

export class CreateCartRequestDto {
  constructor(
    public readonly items: CartItemDto[],
  ) {}

  static toDomain(userId: string, dto: CreateCartRequestDto): Cart {
    return new Cart(userId, dto.items.map(CartItemDto.toDomain));
  }
}