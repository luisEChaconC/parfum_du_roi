import { Notes, Perfume } from "@entity/perfume.entity";
import { PerfumeModel } from "@model/perfume.model";
import { ImageMapper } from "@infrastructure/mapper/image.mapper";
import { NoteMapper } from "@infrastructure/mapper/note.mapper";
import { ProductModel } from "@model/product.model";
import { ProductMapper } from "./product.mapper";

export class PerfumeMapper {
  static fromDomain(perfumeEntity: Perfume): PerfumeModel {
    const perfumeModel = new PerfumeModel();

    // Map properties
    perfumeModel.id = perfumeEntity.id;
    perfumeModel.concentration = perfumeEntity.concentration;
    perfumeModel.category = perfumeEntity.category;

    // Map note relationships
    perfumeModel.topNotes = perfumeEntity.notes.topNotes.map(noteEntity =>
      NoteMapper.fromDomain(noteEntity)
    );
    perfumeModel.middleNotes = perfumeEntity.notes.middleNotes.map(noteEntity =>
      NoteMapper.fromDomain(noteEntity)
    );
    perfumeModel.baseNotes = perfumeEntity.notes.baseNotes.map(noteEntity =>
      NoteMapper.fromDomain(noteEntity)
    );

    return perfumeModel;
  }

  static toDomain(productModel: ProductModel, perfumeModel: PerfumeModel): Perfume {
    const productEntity = ProductMapper.toDomain(productModel);

    // Map note relationships
    const domainTopNotes = perfumeModel.topNotes?.map(noteModel =>
      NoteMapper.toDomain(noteModel)
    ) || [];
    const domainMiddleNotes = perfumeModel.middleNotes?.map(noteModel =>
      NoteMapper.toDomain(noteModel)
    ) || [];
    const domainBaseNotes = perfumeModel.baseNotes?.map(noteModel =>
      NoteMapper.toDomain(noteModel)
    ) || [];

    const domainNotes = new Notes(
      domainTopNotes,
      domainMiddleNotes,
      domainBaseNotes,
    );

    return new Perfume(
      productEntity.name,
      productEntity.description,
      productEntity.brand,
      productEntity.price,
      productEntity.stock,
      productEntity.targetGender,
      productEntity.images,
      perfumeModel.concentration,
      perfumeModel.category,
      domainNotes,
      perfumeModel.id,
    );
  }
}