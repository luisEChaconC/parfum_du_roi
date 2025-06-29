import { injectable, inject } from "inversify";
import { TYPES } from "@composition/types";
import { ICreatePerfumeUseCase } from "@application/ports/use-cases/create-perfume.use-case.interface";
import { IPerfumeRepository } from "@application/ports/repositories/perfume.repository.interface";
import { CreatePerfumeRequestDto } from "@application/dtos/perfume/create-perfume-request.dto";
import { Perfume } from "@entity/perfume.entity";

@injectable()
export class CreatePerfumeUseCase implements ICreatePerfumeUseCase {
  constructor(
    @inject(TYPES.PerfumeRepository)
    private readonly perfumeRepository: IPerfumeRepository,
  ) {}

  async executeAsync(requestDto: CreatePerfumeRequestDto): Promise<Perfume> {
    const perfume = CreatePerfumeRequestDto.toDomain(requestDto);
    const savedPerfume = await this.perfumeRepository.save(perfume);
    return savedPerfume;
  }
}
