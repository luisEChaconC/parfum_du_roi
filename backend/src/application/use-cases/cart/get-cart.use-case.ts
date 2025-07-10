import { injectable, inject } from "inversify";
import { TYPES } from "@composition/types";
import { IGetCartUseCase } from "@port/use-case/cart/get-cart.use-case.interface";
import { ICartRepository } from "@port/repository/cart.repository.interface";
import { GetCartResponseDto } from "@dto/cart/get-cart-response.dto";

@injectable()
export class GetCartUseCase implements IGetCartUseCase {
  constructor(
    @inject(TYPES.CartRepository) private readonly cartRepository: ICartRepository,
  ) {}

  async executeAsync(userId: string): Promise<GetCartResponseDto> {    
    const cart = await this.cartRepository.findByUserId(userId);
    if (!cart) {
      throw new Error("Cart not found");
    }
    return GetCartResponseDto.fromDomain(cart);
  }
}