import { Cart } from "@entity/cart.entity";

export interface ICartRepository {
  saveOrReplace(cart: Cart): Promise<Cart>;
  findByUserId(userId: string): Promise<Cart | null>;
}
