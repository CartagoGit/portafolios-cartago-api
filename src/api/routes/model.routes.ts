import { Router, Response, Request } from "express";

import { IRequestModel } from "../interfaces/model.interfaces";
import { crudRoutes } from "./crud.routes";
import { modelMiddleware } from "../middlewares/model.middleware";
import { testController } from "../controllers/crud.controller";
import { dataModels } from "../data/data-models.data";

/**
 * ? Ruta con el middleware  que envia datos del modelo a traves de la request
 * para decidir el path el modelo antes de pasarle las rutas finales del crud
 */
export const router = Router();

//? hacemos las rutas programáticas
const { authors, courses, projects } = dataModels;

//? Rutas especificas por modelo
router.use(
	"/" + authors.nameModel.en_plural,
	modelMiddleware.Authors,
	crudRoutes
);
router.use(
	"/" + courses.nameModel.en_plural,
	modelMiddleware.Courses,
	crudRoutes
);
router.use(
	"/" + projects.nameModel.en_plural,
	modelMiddleware.Projects,
	crudRoutes
);

// ? Un test para comprobar que el server devuelve valor
router.get("/test", modelMiddleware.Authors, testController);

//? Ruta de Test para comprobar que el middleware para pasar datos por la request funciona correctamente
router.get(
	"/test-model",
	modelMiddleware.Authors,
	(req: Request, res: Response) => {
		try {
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
