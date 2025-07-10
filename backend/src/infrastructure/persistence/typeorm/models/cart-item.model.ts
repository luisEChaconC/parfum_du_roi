import { Entity, Column, ManyToOne, JoinColumn, PrimaryColumn } from "typeorm";
import { CartModel } from "./cart.model";
import { ProductModel } from "./product.model";
@Entity("cart_items")
export class CartItemModel {
  @PrimaryColumn({ name: "product_id" })
  productId!: string;

  @PrimaryColumn({ name: "cart_id" })
  cartId!: string;

  @ManyToOne(() => ProductModel, {
    eager: true,
  })
  @JoinColumn({ name: "product_id" })
  product!: ProductModel;

  @Column({
    type: "integer",
  })
  quantity!: number;

  @ManyToOne(() => CartModel, (cart) => cart.items)
  @JoinColumn({ name: "cart_id" })
  cart!: CartModel;
}
