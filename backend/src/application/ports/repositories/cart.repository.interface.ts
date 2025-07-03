import { Cart } from "@entity/cart.entity";

export interface ICartRepository {
  findByUserId(userId: string): Promise<Cart>;
}
