import { Perfume } from "@domain/entities/perfume.entity";
import { PerfumeCategory } from "@domain/enums/perfume-category.enum";

export interface IPerfumeRepository {
  save(perfume: Perfume): Promise<Perfume>;
  findById(id: string): Promise<Perfume>;
  findByCategory(category: PerfumeCategory): Promise<Perfume[]>;
}
