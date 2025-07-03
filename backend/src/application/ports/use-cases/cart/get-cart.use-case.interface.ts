import { GetCartResponseDto } from "@dto/cart/get-cart-response.dto";

export interface IGetCartUseCase {
  executeAsync(): Promise<GetCartResponseDto>;
}
