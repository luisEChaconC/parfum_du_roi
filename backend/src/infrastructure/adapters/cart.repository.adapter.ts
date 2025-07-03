import { inject, injectable } from "inversify";
import { TYPES } from "@composition/types";
import { ICartRepository } from "@port/repository/cart.repository.interface";
import { TypeOrmCartRepository } from "@repository/cart.repository";
import { Cart } from "@entity/cart.entity";
import { CartMapper } from "@infrastructure/mapper/cart/cart.mapper";

@injectable()
export class CartRepositoryAdapter implements ICartRepository {
  constructor(
    @inject(TYPES.TypeOrmCartRepository) private readonly _cartRepository: TypeOrmCartRepository,
  ) {}

  async saveOrReplace(cart: Cart): Promise<Cart> {
    const cartModel = CartMapper.fromDomain(cart);
    const savedCartModel = await this._cartRepository.saveOrReplace(cartModel);
    return CartMapper.toDomain(savedCartModel);
  }

  async findByUserId(userId: string): Promise<Cart | null> {
    const cartModel = await this._cartRepository.findByUserId(userId);
    if (!cartModel) {
      return null;
    }
    return CartMapper.toDomain(cartModel);
  }
}