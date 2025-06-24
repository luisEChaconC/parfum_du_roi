import { Router } from "express";
import { dependencyContainer, TYPES } from "@composition";
import { PerfumeController } from "@presentation/controllers/perfume.controller";
import { asyncHandler } from "@presentation/middleware/async-handler.middleware";

const router = Router();

const perfumeController = dependencyContainer.get<PerfumeController>(TYPES.PerfumeController);

router.get("/category/:category", asyncHandler(perfumeController.getPerfumesByCategory.bind(perfumeController)));

export { router as perfumeRoutes };
