import { CartItemDto } from "@dto/cart/cart-item.dto";
import { Cart } from "@entity/cart.entity";

export class CreateCartResponseDto {
  constructor(
    public readonly items: CartItemDto[],
  ) {}

  static fromDomain(cart: Cart): CreateCartResponseDto {
    return new CreateCartResponseDto(cart.items.map(CartItemDto.fromDomain));
  }
}
