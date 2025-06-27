import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from "typeorm"
import { Gender } from "@domain/enums/gender.enum"
import { ImageModel } from "@model/image.model"

@Entity("products")
export class ProductModel {
  @PrimaryGeneratedColumn("uuid")
  id!: string

  @Column({
    type: "varchar",
    length: 20,
    nullable: false,
    unique: true,
  })
  stockKeepingUnit!: string

  @Column({
    type: "varchar",
    length: 100,
    nullable: false,
  })
  name!: string

  @Column({
    type: "varchar",
    length: 300,
  })
  description!: string

  @Column({
    type: "varchar",
    length: 100,
    nullable: false,
  })
  brand!: string

  @Column({
    type: "decimal",
    precision: 10,
    scale: 2,
    transformer: {
      to: (value: number) => value,
      from: (value: string) => parseFloat(value),
    },
    unsigned: true,
  })
  price!: number

  @Column({
    type: "int",
    unsigned: true,
  })
  stock!: number
  
  @Column({
    name: "target_gender",
    type: "enum",
    enum: Gender,
  })
  targetGender!: Gender

  @OneToMany(() => ImageModel, (images) => images.product)
  images!: ImageModel[]

  @Column({
    name: "arrival_date",
    type: "date",
  })
  arrivalDate!: Date
}
