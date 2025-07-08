import { PerfumeCategory } from "@domain/enums/perfume-category.enum";
import { GetPerfumeResponseDto } from "@application/dtos/perfume/get-perfume-response.dto";

export interface IGetPerfumesByCategoryUseCase {
  executeAsync(category: PerfumeCategory): Promise<GetPerfumeResponseDto[]>;
}