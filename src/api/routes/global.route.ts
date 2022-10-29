import { Router } from "express";
import { authorsRoutes } from "./authors.route";
import { projectsRoutes } from "./projects.route";
import { testController } from "../controllers/global.controller";

export const router = Router();

//? Rutas especificas
router.use("/authors", authorsRoutes);
router.use("/projects", projectsRoutes);

// ? Un test para comprobar que el server devuelve valor
router.get("/test", testController);
// router.options("/options");

export const globalRoutes = router;
