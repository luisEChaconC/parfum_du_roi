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

  async createEmptyCart(userId: string): Promise<void> {
    await this._cartRepository.createEmptyCart(userId);
  }

  async update(cart: Cart): Promise<Cart> {
    const cartModel = CartMapper.fromDomain(cart);
    const updatedCartModel = await this._cartRepository.update(cartModel);
    return CartMapper.toDomain(updatedCartModel);
  }

  async findByUserId(userId: string): Promise<Cart | null> {
    const cartModel = await this._cartRepository.findByUserId(userId);
    if (!cartModel) {
      return null;
    }
    return CartMapper.toDomain(cartModel);
  }
}