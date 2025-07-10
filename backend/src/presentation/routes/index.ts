import { Router } from "express";
import { authRoutes } from "./auth.routes";
import { userRoutes } from "./user.routes";
import { cartRoutes } from "./cart.routes";
import { perfumeRoutes } from "./perfume.routes";

const router = Router();

router.use("/auth", authRoutes);
router.use("/user", userRoutes);
router.use("/cart", cartRoutes);
router.use("/perfume", perfumeRoutes);

export { router as routes };