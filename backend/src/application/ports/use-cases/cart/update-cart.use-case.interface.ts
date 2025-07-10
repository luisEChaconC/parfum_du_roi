import { UpdateCartRequestDto } from "@dto/cart/update-cart-request.dto";
import { UpdateCartResponseDto } from "@dto/cart/update-cart-response.dto";

export interface IUpdateCartUseCase {
  executeAsync(userId: string, dto: UpdateCartRequestDto): Promise<UpdateCartResponseDto>;
}
