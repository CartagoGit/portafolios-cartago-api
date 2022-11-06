import { Router } from "express";

import {
	createNewModel,
	deleteModel,
	getAllModel,
	getModelById,
	getModelByQuery,
	testController,
	updateModel,
} from "../controllers/crud.controller";

const router = Router();

//? test
router.get("/test", testController);

//? Rutas para cada tipo de peticion

router.post("/create-new", createNewModel);
router.get("/get-all", getAllModel);
router.get("/get-by-id/:id", getModelById);
router.get("/get-by-query", getModelByQuery);
router.put("/update/:id", updateModel);
router.patch("/update/:id", updateModel);
router.delete("/delete/:id", deleteModel);

//! CUIDADO DE USAR
// router.delete("/delete-all", deleteAllCollection);

/**
 * ? Exporta el router con el crud básico
 * @route "/create-new"
 * @route "/get-all"
 * @route "/get-by-id/:id"
 * @route "/get-by-query"
 * @route "/update/:id"
 * @route "/delete/:id"
 */
export const crudRoutes = router;
