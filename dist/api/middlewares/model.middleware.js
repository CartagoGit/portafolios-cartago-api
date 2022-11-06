"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.modelMiddleware = void 0;
const data_models_data_1 = require("../data/data-models.data");
/**
 * ? Clase con middleware que pasara la información de los modelos a traves del request
 * @class ModelMiddleware
 * @middleware Authors
 * @middleware Courses
 * @middleware Projects
 */
class ModelMiddleware {
    constructor() {
        this._Model = (req, res, next, dataModel) => __awaiter(this, void 0, void 0, function* () {
            try {
                req.dataModel = dataModel;
                next();
            }
            catch (error) {
                res.status(500).send({
                    message: "Hubo un error al parsear la información en la request en el middleware",
                });
            }
        });
        //? Desde aqui añadimos a cada request la información que deseamos
        this.Authors = (req, res, next) => {
            this._Model(req, res, next, data_models_data_1.dataModels.authors);
        };
        this.Courses = (req, res, next) => {
            this._Model(req, res, next, data_models_data_1.dataModels.courses);
        };
        this.Projects = (req, res, next) => {
            this._Model(req, res, next, data_models_data_1.dataModels.projects);
        };
    }
}
/**
 * ? Exporta un nuevo objeto de la clase ModelMiddleware
 */
exports.modelMiddleware = new ModelMiddleware();
