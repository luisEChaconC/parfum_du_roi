import { GetPerfumeResponseDto } from "@application/dtos/perfume/get-perfume-response.dto";

export interface IGetPerfumeByIdUseCase {
  executeAsync(id: string): Promise<GetPerfumeResponseDto>;
}
