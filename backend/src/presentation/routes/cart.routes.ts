import { Router } from "express";
import { dependencyContainer, TYPES } from "@composition";
import { CartController } from "@presentation/controllers/cart.controller";
import { asyncHandler } from "@presentation/middleware/async-handler.middleware";
import { authMiddleware } from "@presentation/middleware/auth.middleware";

const router = Router();

const cartController = dependencyContainer.get<CartController>(TYPES.CartController);

// Apply authentication middleware to all cart routes
router.use(authMiddleware);

// Cart routes - all require authentication
router.put("/", asyncHandler(cartController.updateCart.bind(cartController)));
router.get("/", asyncHandler(cartController.getCart.bind(cartController)));

export { router as cartRoutes }; 