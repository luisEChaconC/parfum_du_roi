import { CreatePerfumeRequestDto } from "@dto/perfume/create-perfume-request.dto";
import { Perfume } from "@entity/perfume.entity";

export interface ICreatePerfumeUseCase {
  executeAsync(requestDto: CreatePerfumeRequestDto): Promise<Perfume>;
}
