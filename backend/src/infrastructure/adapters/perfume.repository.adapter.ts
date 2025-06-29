import { inject, injectable } from "inversify";
import { IPerfumeRepository } from "@application/ports/repositories/perfume.repository.interface";
import { TYPES } from "@composition/types";
import { Perfume } from "@domain/entities/perfume.entity";
import { PerfumeMapper } from "@infrastructure/mappers/perfume.mapper";
import { PerfumeCategory } from "@domain/enums/perfume-category.enum";
import { TypeOrmPerfumeRepository } from "@infrastructure/persistence/typeorm/repositories/perfume.repository";
import { ProductMapper } from "@infrastructure/mapper/product.mapper";

@injectable()
export class PerfumeRepositoryAdapter implements IPerfumeRepository {
  constructor(
    @inject(TYPES.TypeOrmPerfumeRepository) private readonly perfumeRepository: TypeOrmPerfumeRepository,
  ) {}

  async save(perfume: Perfume): Promise<Perfume> {
    const productModel = ProductMapper.fromDomain(perfume);
    const perfumeModel = PerfumeMapper.fromDomain(perfume);
    const [savedProductModel, savedPerfumeModel] = await this.perfumeRepository.saveWithDependenciesTransaction(productModel, perfumeModel);
    return PerfumeMapper.toDomain(savedProductModel, savedPerfumeModel);
  }

  async findByCategory(category: PerfumeCategory): Promise<Perfume[]> {
    const productPerfumePairs = await this.perfumeRepository.findByCategory(category);

    // Transform each pair into a domain Perfume entity
    return productPerfumePairs.map(([productModel, perfumeModel]) =>
      PerfumeMapper.toDomain(productModel, perfumeModel)
    );
  }
}