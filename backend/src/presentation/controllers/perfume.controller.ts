import { injectable, inject } from "inversify";
import { TYPES } from "@composition/types";
import { Request, Response } from "express";
import { IGetPerfumesByCategoryUseCase } from "@application/ports/use-cases/get-perfume-by-category.use-case.interface";
import { PerfumeCategory } from "@domain/enums/perfume-category.enum";
import { BadRequestError } from "@presentation/errors/bad-request.error";

@injectable()
export class PerfumeController {
  constructor(
    @inject(TYPES.GetPerfumesByCategoryUseCase)
    private readonly getPerfumesByCategoryUseCase: IGetPerfumesByCategoryUseCase
  ) {}

  async getPerfumesByCategory(req: Request, res: Response): Promise<void> {
    const { category } = req.params as { category: PerfumeCategory };

    if (!Object.values(PerfumeCategory).includes(category)) {
      throw new BadRequestError("Invalid perfume category provided.");
    }

    const perfumes = await this.getPerfumesByCategoryUseCase.execute(category);
    res.status(200).json(perfumes);
  }
}
