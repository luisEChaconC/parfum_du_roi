import { inject, injectable } from "inversify";
import { TYPES } from "@composition/types";
import { ICartRepository } from "@port/repository/cart.repository.interface";
import { TypeOrmCartRepository } from "@infrastructure/persistence/typeorm/repositories/cart.repository";
import { Cart } from "@entity/cart.entity";
import { CartMapper } from "@infrastructure/mapper/cart/cart.mapper";

@injectable()
export class CartRepositoryAdapter implements ICartRepository {
  constructor(
    @inject(TYPES.TypeOrmCartRepository) private readonly _cartRepository: TypeOrmCartRepository,
  ) {}

  async findByUserId(userId: string): Promise<Cart> {
    const cartModel = await this._cartRepository.findByUserId(userId);
    return CartMapper.toDomain(cartModel);
  }
}