import { Router } from 'express';
import { PaymentController } from '@presentation/controllers/payment.controller';

const paymentRouter = Router();

paymentRouter.post('/create-payment-intent', PaymentController.createPaymentIntent);

export default paymentRouter;
