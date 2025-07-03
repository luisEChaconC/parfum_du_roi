import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { CartItemModel } from "./cart-item.model";

@Entity("carts")
export class CartModel {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  userId!: string;

  @OneToMany(() => CartItemModel, (cartItem) => cartItem.cart, {
    eager: true,
    cascade: true,
  })
  items!: CartItemModel[];
}