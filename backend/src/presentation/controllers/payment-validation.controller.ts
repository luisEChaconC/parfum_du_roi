import { Request, Response } from "express";
import { injectable, inject } from "inversify";
import { TYPES } from "@composition/types";
import { IProcessPaymentUseCase } from "@port/use-case/payment/process-payment.use-case.interface";
import { PaymentDTO } from "@dto/payment/payment.dto";

@injectable()
export class PaymentValidationController {
  constructor(
    @inject(TYPES.ProcessPaymentUseCase)
    private readonly processPaymentUseCase: IProcessPaymentUseCase
  ) {}

  async validatePayment(req: Request, res: Response): Promise<void> {
    const paymentData: PaymentDTO = req.body;

    const result = this.processPaymentUseCase.execute(paymentData);

    res.status(200).json(result);
  }
}
