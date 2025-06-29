import { injectable, inject } from "inversify";
import { TYPES } from "@composition/types";
import { IGetPerfumesByCategoryUseCase } from "@port/use-case/perfume/get-perfume-by-category.use-case.interface";
import { IPerfumeRepository } from "@application/ports/repositories/perfume.repository.interface";
import { PerfumeCategory } from "@domain/enums/perfume-category.enum";
import { GetPerfumeByCategoryResponseDto } from "@application/dtos/perfume/get-perfume-by-category-response.dto";

@injectable()
export class GetPerfumesByCategoryUseCase implements IGetPerfumesByCategoryUseCase {
  constructor(
    @inject(TYPES.PerfumeRepository)
    private readonly perfumeRepository: IPerfumeRepository
  ) {}

  async executeAsync(category: PerfumeCategory): Promise<GetPerfumeByCategoryResponseDto[]> {
    const perfumes = await this.perfumeRepository.findByCategory(category);
    return perfumes.map(perfume => GetPerfumeByCategoryResponseDto.fromDomain(perfume));
  }
}