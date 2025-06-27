import { Entity, Column, ManyToMany, JoinTable } from "typeorm"
import { ProductModel } from "@infrastructure/persistence/typeorm/models/product.model"
import { Perfume, Notes } from "@entity/perfume.entity"
import { NoteModel } from "@model/note.model"
import { PerfumeCategory } from "@domain/enums/perfume-category.enum"
import { PerfumeConcentration } from "@domain/enums/perfume-concentration.enum"

@Entity("perfumes")
export class PerfumeModel extends ProductModel {
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

  @ManyToMany(() => NoteModel)
  @JoinTable()
  topNotes!: NoteModel[]

  @ManyToMany(() => NoteModel)
  @JoinTable()
  middleNotes!: NoteModel[]

  @ManyToMany(() => NoteModel)
  @JoinTable()
  baseNotes!: NoteModel[]

  static fromDomain(perfume: Perfume): PerfumeModel {
    const ormEntity = new PerfumeModel();
    ormEntity.id = perfume.id;
    ormEntity.name = perfume.name;
    ormEntity.brand = perfume.brand;
    ormEntity.category = perfume.category;
    ormEntity.concentration = perfume.concentration;
    ormEntity.description = perfume.description;
    ormEntity.price = perfume.price;
    ormEntity.stock = perfume.stock;
    return ormEntity;
  }

  toDomain(): Perfume {
    const domainEntityImages = this.images?.map(ormEntityImage => ormEntityImage.toDomain()) || [];

    const domainEntityNotes = new Notes (
      this.topNotes?.map(ormEntityNote => ormEntityNote.toDomain()) || [],
      this.middleNotes?.map(ormEntityNote => ormEntityNote.toDomain()) || [],
      this.baseNotes?.map(ormEntityNote => ormEntityNote.toDomain()) || [],
    );

    return new Perfume (
      this.id,
      this.name,
      this.description,
      this.brand,
      this.price,
      this.stock,
      this.targetGender,
      domainEntityImages,
      this.arrivalDate,
      this.concentration,
      this.category,
      domainEntityNotes,
    );
  }
}
