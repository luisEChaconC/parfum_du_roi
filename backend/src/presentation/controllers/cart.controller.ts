import { injectable, inject } from "inversify";
import { TYPES } from "@composition/types";
import { Request, Response } from "express";
import { ICreateCartUseCase } from "@port/use-case/cart/create-cart.use-case.interface";
import { IGetCartUseCase } from "@port/use-case/cart/get-cart.use-case.interface";
import { CreateCartRequestDto } from "@dto/cart/create-cart-request.dto";

@injectable()
export class CartController {
  constructor(
    @inject(TYPES.CreateCartUseCase) private readonly createCartUseCase: ICreateCartUseCase,
    @inject(TYPES.GetCartUseCase) private readonly getCartUseCase: IGetCartUseCase,
  ) {}

  async createCart(req: Request<CreateCartRequestDto>, res: Response): Promise<void> {
    const cart = await this.createCartUseCase.executeAsync(req.body.userId, req.body);
    res.status(201).json(cart);
  }

  async getCart(req: Request, res: Response): Promise<void> {
    if (!req.session.userId) {
      res.status(401).json({ error: "Unauthorized" });
      return;
    }
    const cart = await this.getCartUseCase.executeAsync(req.session.userId);
    res.status(200).json(cart);
  }
}
