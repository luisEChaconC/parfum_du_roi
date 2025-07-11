import { GetCartResponseDto } from "@dto/cart/get-cart-response.dto";

export interface IGetCartUseCase {
  executeAsync(userId: string): Promise<GetCartResponseDto>;
}
