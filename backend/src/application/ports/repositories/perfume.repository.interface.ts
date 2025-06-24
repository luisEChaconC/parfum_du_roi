import { Perfume } from "@domain/entities/perfume.entity";
import { PerfumeCategory } from "@domain/enums/perfume-category.enum";

export interface IPerfumeRepository {
  findByCategory(category: PerfumeCategory): Promise<Perfume[]>;
}
