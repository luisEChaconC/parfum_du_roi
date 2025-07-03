import { CreateCartRequestDto } from "@application/dtos/cart/create-cart-request.dto";
import { CreateCartResponseDto } from "@application/dtos/cart/create-cart-response.dto";
  
export interface ICreateCartUseCase {
  executeAsync(userId: string, dto: CreateCartRequestDto): Promise<CreateCartResponseDto>;
}