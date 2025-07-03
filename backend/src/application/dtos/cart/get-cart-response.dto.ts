import { Cart } from "@entity/cart.entity";
import { CartItemDto } from "./cart-item.dto";

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
