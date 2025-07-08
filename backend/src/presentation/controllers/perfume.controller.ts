import { injectable, inject } from "inversify";
import { TYPES } from "@composition/types";
import { Request, Response } from "express";
import { IGetPerfumesByCategoryUseCase } from "@port/use-case/perfume/get-perfume-by-category.use-case.interface";
import { PerfumeCategory } from "@domain/enums/perfume-category.enum";
import { BadRequestError } from "@presentation/errors/bad-request.error";
import { CreatePerfumeRequestDto } from "@dto/perfume/create-perfume-request.dto";
import { ICreatePerfumeUseCase } from "@port/use-case/perfume/create-perfume.use-case.interface";

@injectable()
export class PerfumeController {
  constructor(
    @inject(TYPES.GetPerfumesByCategoryUseCase) private readonly getPerfumesByCategoryUseCase: IGetPerfumesByCategoryUseCase,
    @inject(TYPES.CreatePerfumeUseCase) private readonly createPerfumeUseCase: ICreatePerfumeUseCase,
  ) {}

  async getPerfumesByCategory(req: Request, res: Response): Promise<void> {
    const { category } = req.params as { category: PerfumeCategory };

    if (!Object.values(PerfumeCategory).includes(category)) {
      throw new BadRequestError("Invalid perfume category provided.");
    }

    const perfumes = await this.getPerfumesByCategoryUseCase.executeAsync(category);
    res.status(200).json(perfumes);
  }

  async createPerfume(req: Request<CreatePerfumeRequestDto>, res: Response): Promise<void> {
    const createdPerfume = await this.createPerfumeUseCase.executeAsync(req.body);
    res.status(201).json(createdPerfume);
  }
}
