import { Cart } from "@entity/cart.entity";

export interface ICartRepository {
  getCart(userId: string): Promise<Cart>;
}
