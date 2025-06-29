import { Router } from "express";
import { perfumeRoutes } from "./perfume.routes";
import { authRoutes } from "./auth.routes";
import { userRoutes } from "./user.routes";

const router = Router();

router.use("/auth", authRoutes);
router.use("/user", userRoutes);
router.use("/perfume", perfumeRoutes);

export { router as routes };