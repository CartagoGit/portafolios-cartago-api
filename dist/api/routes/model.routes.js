"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const crud_routes_1 = require("./crud.routes");
const model_middleware_1 = require("../middlewares/model.middleware");
const crud_controller_1 = require("../controllers/crud.controller");
const data_models_data_1 = require("../data/data-models.data");
/**
 * ? Ruta con el middleware  que envia datos del modelo a traves de la request
 * para decidir el path el modelo antes de pasarle las rutas finales del crud
 */
exports.router = (0, express_1.Router)();
//? hacemos las rutas programáticas
const { authors, courses, projects } = data_models_data_1.dataModels;
//? Rutas especificas por modelo
exports.router.use("/" + authors.nameModel.en_plural, model_middleware_1.modelMiddleware.Authors, crud_routes_1.crudRoutes);
exports.router.use("/" + courses.nameModel.en_plural, model_middleware_1.modelMiddleware.Courses, crud_routes_1.crudRoutes);
exports.router.use("/" + projects.nameModel.en_plural, model_middleware_1.modelMiddleware.Projects, crud_routes_1.crudRoutes);
// ? Un test para comprobar que el server devuelve valor
exports.router.get("/test", model_middleware_1.modelMiddleware.Authors, crud_controller_1.testController);
//? Ruta de Test para comprobar que el middleware para pasar datos por la request funciona correctamente
exports.router.get("/test-model", model_middleware_1.modelMiddleware.Authors, (req, res) => {
    try {
        res.status(500).send({
            message: "Rula",
            dataModel: req.dataModel,
        });
    }
    catch (error) {
        res.status(500).send({
            message: "No rula",
        });
    }
});
