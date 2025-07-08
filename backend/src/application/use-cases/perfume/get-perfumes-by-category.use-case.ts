import { injectable, inject } from "inversify";
import { TYPES } from "@composition/types";
import { IGetPerfumesByCategoryUseCase } from "@port/use-case/perfume/get-perfume-by-category.use-case.interface";
import { IPerfumeRepository } from "@application/ports/repositories/perfume.repository.interface";
import { PerfumeCategory } from "@domain/enums/perfume-category.enum";
import { GetPerfumeResponseDto } from "@application/dtos/perfume/get-perfume-response.dto";

@injectable()
export class GetPerfumesByCategoryUseCase implements IGetPerfumesByCategoryUseCase {
  constructor(
    @inject(TYPES.PerfumeRepository)
    private readonly perfumeRepository: IPerfumeRepository
  ) {}

  async executeAsync(category: PerfumeCategory): Promise<GetPerfumeResponseDto[]> {
    const perfumes = await this.perfumeRepository.findByCategory(category);
    return perfumes.map(perfume => GetPerfumeResponseDto.fromDomain(perfume));
  }
}