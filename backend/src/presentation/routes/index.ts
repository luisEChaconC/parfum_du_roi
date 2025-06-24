import { Router } from "express";
import { perfumeRoutes } from "./perfume.routes";

const router = Router();

router.use("/perfumes", perfumeRoutes);

export { router as routes };