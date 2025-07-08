import { injectable, inject } from "inversify";
import { TYPES } from "@composition/types";
import { IGetPerfumeByIdUseCase } from "@port/use-case/perfume/get-perfume-by-id.use-case.interface";
import { IPerfumeRepository } from "@port/repository/perfume.repository.interface";
import { GetPerfumeResponseDto } from "@dto/perfume/get-perfume-response.dto";

@injectable()
export class GetPerfumeByIdUseCase implements IGetPerfumeByIdUseCase {
  constructor(
    @inject(TYPES.PerfumeRepository) private readonly perfumeRepository: IPerfumeRepository
  ) {}

  async executeAsync(id: string): Promise<GetPerfumeResponseDto> {
    const perfume = await this.perfumeRepository.findById(id);
    return GetPerfumeResponseDto.fromDomain(perfume);
  }
}

