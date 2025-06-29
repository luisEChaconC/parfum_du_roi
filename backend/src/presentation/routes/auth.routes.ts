import { Router } from "express";
import { dependencyContainer, TYPES } from "@composition";
import { AuthController } from "@presentation/controllers/auth.controller";
import { asyncHandler } from "@presentation/middleware/async-handler.middleware";

const router = Router();

const authController = dependencyContainer.get<AuthController>(TYPES.AuthController);

// Posts
router.post("/login", asyncHandler(authController.logIn.bind(authController)));
router.post("/logout", asyncHandler(authController.logOut.bind(authController)));

export { router as authRoutes };