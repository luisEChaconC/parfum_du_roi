import { Cart } from "@entity/cart.entity";

export interface ICartRepository {
  createEmptyCart(userId: string): Promise<void>;
  update(cart: Cart): Promise<Cart>;
  findByUserId(userId: string): Promise<Cart | null>;
}
