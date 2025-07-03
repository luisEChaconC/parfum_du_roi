import { injectable, inject } from "inversify";
import { TYPES } from "@composition/types";
import { ICartRepository } from "@port/repository/cart.repository.interface";
import { ICreateCartUseCase } from "@port/use-case/cart/create-cart.use-case.interface";
import { CreateCartRequestDto } from "@application/dtos/cart/create-cart-request.dto";
import { CreateCartResponseDto } from "@application/dtos/cart/create-cart-response.dto";

@injectable()
export class CreateCartUseCase implements ICreateCartUseCase {
  constructor(
    @inject(TYPES.CartRepository) private readonly cartRepository: ICartRepository,
  ) {}

  async executeAsync(userId: string, dto: CreateCartRequestDto): Promise<CreateCartResponseDto> {
    const cart = CreateCartRequestDto.toDomain(userId, dto);
    const savedCart = await this.cartRepository.saveOrReplace(cart);
    return CreateCartResponseDto.fromDomain(savedCart);
  }
}
  