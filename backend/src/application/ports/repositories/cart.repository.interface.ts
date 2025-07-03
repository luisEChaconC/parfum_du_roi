import { Cart } from "@entity/cart.entity";

export interface ICartRepository {
  getCart(): Promise<Cart>;
}
