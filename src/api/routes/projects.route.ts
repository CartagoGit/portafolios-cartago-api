import { Router } from "express";
import { testController } from "../controllers/global.controller";

const router = Router();

//? test
router.get("/test", testController);

export const projectsRoutes = router;
