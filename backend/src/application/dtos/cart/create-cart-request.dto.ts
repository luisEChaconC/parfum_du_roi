import { CartItemDto } from "@dto/cart/cart-item.dto";
import { Cart } from "@entity/cart.entity";

export class CreateCartRequestDto {
  constructor(
    public readonly items: CartItemDto[],
  ) {}

  static toDomain(userId: string, dto: CreateCartRequestDto): Cart {
    return new Cart(userId, dto.items.map(CartItemDto.toDomain));
  }
}