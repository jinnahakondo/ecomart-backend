import { Router } from "express";
import { getStats } from "../controllers/dasboard.stats";
const router = Router();

router.get("/", getStats);

export default router;
