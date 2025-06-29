import { TYPES } from "@composition";
import { dependencyContainer } from "@composition";
import { UserController } from "@controller/user.controller";
import { asyncHandler } from "@presentation/middleware/async-handler.middleware";
import { Router } from "express";

const router = Router();

const userController = dependencyContainer.get<UserController>(TYPES.UserController);

router.post("/", asyncHandler(userController.createUser.bind(userController)));

export { router as userRoutes };