import { Entity, PrimaryColumn, Column, ManyToOne, JoinColumn } from "typeorm"
import { Image } from "@domain/entities/image.entity"
import { ProductModel } from "./product.model";

@Entity("images")
export class ImageModel {
  @PrimaryColumn({
    type: "uuid",
  })
  id!: string

  @Column({
    type: "varchar",
    length: 255,
    nullable: false,
    unique: true,
  })
  path!: string

  @ManyToOne(() => ProductModel, (products) => products.images)
  @JoinColumn({ name: "product_id" })
  product!: ProductModel;
}
