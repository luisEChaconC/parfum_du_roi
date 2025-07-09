import { Router } from "express";
import { dependencyContainer, TYPES } from "@composition";
import { PaymentValidationController } from "@presentation/controllers/payment-validation.controller";
import { asyncHandler } from "@presentation/middleware/async-handler.middleware";

const router = Router();

const paymentValidationController = dependencyContainer.get<PaymentValidationController>(
  TYPES.PaymentValidationController
);

// POST /api/payments/validates
router.post(
  "/validate",
  asyncHandler(paymentValidationController.validatePayment.bind(paymentValidationController))
);

export { router as paymentValidationRoutes };
