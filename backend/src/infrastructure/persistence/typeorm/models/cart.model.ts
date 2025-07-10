import { Entity, OneToMany, PrimaryColumn } from "typeorm";
import { CartItemModel } from "./cart-item.model";

@Entity("carts")
export class CartModel {
  @PrimaryColumn()
  userId!: string;

  @OneToMany(() => CartItemModel, (cartItem) => cartItem.cart, {
    eager: true,
  })
  items!: CartItemModel[];
}