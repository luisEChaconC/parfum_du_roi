import { Entity, Column, ManyToMany, JoinTable, PrimaryColumn, OneToOne, JoinColumn } from "typeorm"
import { ProductModel } from "@infrastructure/persistence/typeorm/models/product.model"
import { Perfume, Notes } from "@entity/perfume.entity"
import { NoteModel } from "@model/note.model"
import { ImageModel } from "@model/image.model"
import { PerfumeCategory } from "@domain/enums/perfume-category.enum"
import { PerfumeConcentration } from "@domain/enums/perfume-concentration.enum"

@Entity("perfumes")
export class PerfumeModel {
  @PrimaryColumn({
    type: "uuid",
    name: "product_id",
  })
  id!: string

  @Column({
    type: "enum",
    enum: PerfumeConcentration,
  })
  concentration!: PerfumeConcentration;

  @Column({
    type: "enum",
    enum: PerfumeCategory,
  })
  category!: PerfumeCategory

  @ManyToMany(() => NoteModel, {
    eager: true,
  })
  @JoinTable({
    name: "perfume_top_notes",
    joinColumn: {
      name: "perfume_id",
    },
    inverseJoinColumn: {
      name: "note_id",
    },
  })
  topNotes!: NoteModel[]

  @ManyToMany(() => NoteModel, {
    eager: true,
  })
  @JoinTable({
    name: "perfume_middle_notes",
    joinColumn: {
      name: "perfume_id",
    },
    inverseJoinColumn: {
      name: "note_id",
    },
  })
  middleNotes!: NoteModel[]

  @ManyToMany(() => NoteModel, {
    eager: true,
  })
  @JoinTable({
    name: "perfume_base_notes",
    joinColumn: {
      name: "perfume_id",
    },
    inverseJoinColumn: {
      name: "note_id",
    },
  })
  baseNotes!: NoteModel[]

  @OneToOne(() => ProductModel, {
    eager: true,
  })
  @JoinColumn({
    name: "product_id",
  })
  product!: ProductModel
}
