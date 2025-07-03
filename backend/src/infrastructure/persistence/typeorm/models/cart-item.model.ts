import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { CartModel } from "./cart.model";
import { ProductModel } from "./product.model";
@Entity("cart_items")
export class CartItemModel {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => ProductModel, (product) => product.id)
  product!: ProductModel;

  @Column({
    type: "integer",
  })
  quantity!: number;

  @ManyToOne(() => CartModel, (cart) => cart.items)
  cart!: CartModel;
}
