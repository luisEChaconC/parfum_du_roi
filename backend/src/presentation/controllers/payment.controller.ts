import { Request, Response } from 'express';
import { stripe } from '@infrastructure/config/stripe';
import { dataSource  } from '@infrastructure/persistence/typeorm/data-source';
import { Order } from '@domain/entities/order';

export class PaymentController {
  static async createPaymentIntent(req: Request, res: Response) {
    const { amount, currency } = req.body;

    const orderRepository = dataSource .getRepository(Order);

    try {
      const paymentIntent = await stripe.paymentIntents.create({
        amount: Math.round(amount * 100),
        currency: currency || 'usd',
        automatic_payment_methods: { enabled: true },
      });

      const order = orderRepository.create({
        amount,
        status: paymentIntent.status,
        stripePaymentIntentId: paymentIntent.id,
      });

      await orderRepository.save(order);

      res.json({ clientSecret: paymentIntent.client_secret });
    } catch (error: any) {
      console.error(error);
      res.status(500).json({ error: error.message });
    }
  }
}
