import { dataSource } from "@infrastructure/persistence/typeorm/data-source"
import { PerfumeModel } from "@model/perfume.model"
import { Perfume } from "@entity/perfume.entity";
import { PerfumeCategory } from "@domain/enums/perfume-category.enum";
import { IPerfumeRepository } from "@application/ports/repositories/perfume.repository.interface";
import { DatabaseError } from "@infrastructure/errors/database.error";

export class PerfumeRepository implements IPerfumeRepository {
  private readonly _perfumeRepository;

  constructor() {
    this._perfumeRepository = dataSource.getRepository(PerfumeModel);
  }

  async findByCategory(category: PerfumeCategory): Promise<Perfume[]> {
    try {
      const perfumeORMs = await this._perfumeRepository.find({
        where: { category: category },
        relations: ["images", "topNotes", "middleNotes", "baseNotes"]
      })
      return perfumeORMs.map(perfumeORM => perfumeORM.toDomain());
    } catch (error) {
      throw new DatabaseError("Failed to find perfumes by category");
    }
  }
}