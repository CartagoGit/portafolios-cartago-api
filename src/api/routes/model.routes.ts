import { Router, Response, Request } from "express";

import { IRequestModel } from "../interfaces/model.interfaces";
import { crudRoutes } from "./crud.routes";
import { modelMiddleware } from "../middlewares/model.middleware";
import { testController } from "../controllers/crud.controller";

export const router = Router();

//? Rutas especificas por modelo
router.use("/authors", modelMiddleware.Authors, crudRoutes);
router.use("/courses", modelMiddleware.Courses, crudRoutes);
router.use("/projects", modelMiddleware.Projects, crudRoutes);

// ? Un test para comprobar que el server devuelve valor
router.get("/test", modelMiddleware.Authors, testController);

//? Un test para comprobar que funciona el middleware para pasar datos a traves del request
router.get(
	"/test-model",
	modelMiddleware.Authors,
	(req: Request, res: Response) => {
		try {
			console.log((req as IRequestModel).dataModel);
			res.status(500).send({
				message: "Rula",
				dataModel: (req as IRequestModel).dataModel,
			});
		} catch (error) {
			res.status(500).send({
				message: "No rula",
			});
		}
	}
);
