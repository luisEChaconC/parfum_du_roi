import { injectable, inject } from "inversify";
import { TYPES } from "@composition/types";
import { Request, Response } from "express";
import { IUpdateCartUseCase } from "@port/use-case/cart/update-cart.use-case.interface";
import { IGetCartUseCase } from "@port/use-case/cart/get-cart.use-case.interface";
import { UpdateCartRequestDto } from "@dto/cart/update-cart-request.dto";

@injectable()
export class CartController {
  constructor(
    @inject(TYPES.UpdateCartUseCase) private readonly updateCartUseCase: IUpdateCartUseCase,
    @inject(TYPES.GetCartUseCase) private readonly getCartUseCase: IGetCartUseCase,
  ) {}

  async updateCart(req: Request<UpdateCartRequestDto>, res: Response): Promise<void> {
    if (!req.session.userId) {
      res.status(401).json({ error: "Unauthorized" });
      return;
    }

    const cart = await this.updateCartUseCase.executeAsync(req.session.userId, req.body);
    res.status(200).json(cart);
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
