import { Perfume } from "@domain/entities/perfume.entity";
import { PerfumeCategory } from "@domain/enums/perfume-category.enum";
import { PerfumeConcentration } from "@domain/enums/perfume-concentration.enum";
import { Gender } from "@domain/enums/gender.enum";

export class PerfumeResponseDto {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly description: string,
    public readonly brand: string,
    public readonly concentration: PerfumeConcentration,
    public readonly category: PerfumeCategory,
    public readonly topNotes: string[],
    public readonly middleNotes: string[],
    public readonly baseNotes: string[],
    public readonly price: number,
    public readonly stock: number,
    public readonly targetGender: Gender,
    public readonly imagePaths: string[],
    public readonly arrivalDate: Date,
  ) {}

  static fromDomain(perfume: Perfume): PerfumeResponseDto {
    return new PerfumeResponseDto(
      perfume.id,
      perfume.name,
      perfume.description,
      perfume.brand,
      perfume.concentration,
      perfume.category,
      perfume.notes.topNotes.map(note => note.name),
      perfume.notes.middleNotes.map(note => note.name),
      perfume.notes.baseNotes.map(note => note.name),
      perfume.price,
      perfume.stock,
      perfume.targetGender,
      perfume.images.map(image => image.path),
      perfume.arrivalDate,
    );
  }
}
