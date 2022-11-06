"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.crudRoutes = void 0;
const express_1 = require("express");
const crud_controller_1 = require("../controllers/crud.controller");
const router = (0, express_1.Router)();
//? test
router.get("/test", crud_controller_1.testController);
//? Rutas para cada tipo de peticion
router.post("/create-new", crud_controller_1.createNewModel);
router.get("/get-all", crud_controller_1.getAllModel);
router.get("/get-by-id/:id", crud_controller_1.getModelById);
router.get("/get-by-query", crud_controller_1.getModelByQuery);
router.put("/update/:id", crud_controller_1.updateModel);
router.patch("/update/:id", crud_controller_1.updateModel);
router.delete("/delete/:id", crud_controller_1.deleteModel);
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
exports.crudRoutes = router;
