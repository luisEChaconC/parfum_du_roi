import { injectable, inject } from "inversify";
import { TYPES } from "@composition/types";
import { DataSource, Repository } from "typeorm";
import { CartModel } from "@model/cart.model";
import { CartItemModel } from "@model/cart-item.model";

@injectable()
export class TypeOrmCartRepository {
  private readonly _cartRepository: Repository<CartModel>;
  private readonly _cartItemRepository: Repository<CartItemModel>;

  constructor(
    @inject(TYPES.DataSource) private readonly _dataSource: DataSource,
  ) {
    this._cartRepository = this._dataSource.getRepository(CartModel);
    this._cartItemRepository = this._dataSource.getRepository(CartItemModel);
  }

  async createEmptyCart(userId: string): Promise<CartModel> {
    const cart = new CartModel();
    cart.userId = userId;
    cart.items = [];

    return this._cartRepository.save(cart);
  }

  async update(cart: CartModel): Promise<CartModel> {
    return this._dataSource.transaction(async (transactionalEntityManager) => {
      await transactionalEntityManager.delete(CartItemModel, { cartId: cart.userId });
      const cartItemRepository = transactionalEntityManager.getRepository(CartItemModel);
      await cartItemRepository.save(cart.items);

      const cartRepository = transactionalEntityManager.getRepository(CartModel);
      const updatedCart = await cartRepository.save(cart);
      
      return updatedCart;
    });
  }

  async findByUserId(userId: string): Promise<CartModel | null> {
    return this._cartRepository.findOne({ where: { userId } });
  }
}
