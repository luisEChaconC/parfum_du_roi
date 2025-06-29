import { PerfumeCategory } from "@domain/enums/perfume-category.enum";
import { GetPerfumeByCategoryResponseDto } from "@application/dtos/perfume/get-perfume-by-category-response.dto";

export interface IGetPerfumesByCategoryUseCase {
  executeAsync(category: PerfumeCategory): Promise<GetPerfumeByCategoryResponseDto[]>;
}