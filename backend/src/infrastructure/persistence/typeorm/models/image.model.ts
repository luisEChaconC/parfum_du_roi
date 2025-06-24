import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm"
import { ProductModel } from "@infrastructure/persistence/typeorm/models/product.model"
import { Image } from "@domain/entities/image.entity"

@Entity("images")
export class ImageModel {
  @PrimaryGeneratedColumn("uuid")
  id!: string

  @Column({
    type: "varchar",
    length: 255,
  })
  path!: string

  @ManyToOne(() => ProductModel, (products) => products.images)
  @JoinColumn({ name: "productId" })
  product!: ProductModel

  static fromDomain(image: Image): ImageModel {
    const ormEntity = new ImageModel();
    ormEntity.id = image.id;
    ormEntity.path = image.path;
    return ormEntity;
  }

  toDomain(): Image {
    return new Image (
      this.id,
      this.path,
    )
  }
}
