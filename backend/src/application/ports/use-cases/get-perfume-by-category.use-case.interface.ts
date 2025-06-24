import { PerfumeCategory } from "@domain/enums/perfume-category.enum";
import { PerfumeResponseDto } from "@application/dtos/perfume/perfume-response.dto";

export interface IGetPerfumesByCategoryUseCase {
  execute(category: PerfumeCategory): Promise<PerfumeResponseDto[]>;
}