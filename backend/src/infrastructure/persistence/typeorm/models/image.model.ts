import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm"
import { Image } from "@domain/entities/image.entity"
import { ProductModel } from "./product.model";

@Entity("images")
export class ImageModel {
  @PrimaryGeneratedColumn("uuid")
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

  static fromDomain(image: Image): ImageModel {
    const ormEntity = new ImageModel();
    ormEntity.path = image.path;
    return ormEntity;
  }

  toDomain(): Image {
    return new Image (
      this.path,
    )
  }
}
