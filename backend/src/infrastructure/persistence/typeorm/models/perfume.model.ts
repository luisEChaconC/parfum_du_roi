import { Entity, Column, ManyToMany, JoinTable, PrimaryColumn } from "typeorm"
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
  @JoinTable()
  topNotes!: NoteModel[]

  @ManyToMany(() => NoteModel, {
    eager: true,
  })
  @JoinTable()
  middleNotes!: NoteModel[]

  @ManyToMany(() => NoteModel, {
    eager: true,
  })
  @JoinTable()
  baseNotes!: NoteModel[]
}
