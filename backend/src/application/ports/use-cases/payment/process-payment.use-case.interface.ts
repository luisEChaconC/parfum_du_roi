import { PaymentDTO } from '@dto/payment/payment.dto';

export interface IProcessPaymentUseCase {
  execute(data: PaymentDTO): { aprobado: boolean; mensaje: string };
}
