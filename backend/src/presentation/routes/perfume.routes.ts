import { Router } from "express";
import { dependencyContainer, TYPES } from "@composition";
import { PerfumeController } from "@presentation/controllers/perfume.controller";
import { asyncHandler } from "@presentation/middleware/async-handler.middleware";

const router = Router();

const perfumeController = dependencyContainer.get<PerfumeController>(TYPES.PerfumeController);

// Gets
router.get("/:id", asyncHandler(perfumeController.getPerfumeById.bind(perfumeController)));
router.get("/category/:category", asyncHandler(perfumeController.getPerfumesByCategory.bind(perfumeController)));

// Posts
router.post("/", asyncHandler(perfumeController.createPerfume.bind(perfumeController)));

export { router as perfumeRoutes };
