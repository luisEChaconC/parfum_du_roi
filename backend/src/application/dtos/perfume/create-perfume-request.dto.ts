import { Image } from "@domain/entities/image.entity";
import { Gender } from "@domain/enums/gender.enum";
import { PerfumeCategory } from "@domain/enums/perfume-category.enum";
import { PerfumeConcentration } from "@domain/enums/perfume-concentration.enum";
import { NotesDto } from "@dto/notes.dto";
import { Perfume} from "@domain/entities/perfume.entity";
import { ImageDto } from "@dto/image.dto";

export class CreatePerfumeRequestDto {
  constructor(
    public readonly name: string,
    public readonly description: string,
    public readonly brand: string,
    public readonly price: number,
    public readonly stock: number,
    public readonly targetGender: Gender,
    public readonly images: ImageDto[],
    public readonly concentration: PerfumeConcentration,
    public readonly category: PerfumeCategory,
    public readonly notes: NotesDto,
    public readonly stockKeepingUnit?: string,
    public readonly arrivalDate?: Date,
  ) {}

  static toDomain(createPerfumeRequestDto: CreatePerfumeRequestDto): Perfume {
    return new Perfume (
      createPerfumeRequestDto.name,
      createPerfumeRequestDto.description,
      createPerfumeRequestDto.brand,
      createPerfumeRequestDto.price,
      createPerfumeRequestDto.stock,
      createPerfumeRequestDto.targetGender,
      createPerfumeRequestDto.images.map(imageDto => ImageDto.toDomain(imageDto)),
      createPerfumeRequestDto.concentration,
      createPerfumeRequestDto.category,
      NotesDto.toDomain(createPerfumeRequestDto.notes),
      createPerfumeRequestDto.stockKeepingUnit,
      createPerfumeRequestDto.arrivalDate,
    );
  }
}