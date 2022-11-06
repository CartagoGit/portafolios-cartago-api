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
exports.testController = exports.deleteAllCollectionModel = exports.deleteModel = exports.updateModel = exports.getModelByQuery = exports.getModelById = exports.getAllModel = exports.createNewModel = void 0;
const response_helper_1 = require("../../helpers/response.helper");
//$ Controllador general de todos los cruds basicos
/**
 * ? POST -  Crea un nuevo modelo
 * @param req
 * @param res
 */
const createNewModel = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //? Sacamos la infromación añadida en el middleware de la request
    const { Model: ModelRecived, nameModel } = req
        .dataModel;
    try {
        if (!req.body)
            throw Error("No se han recibido datos en el body de la petición");
        //? Comprobamos que no se pase ninguna fecha directamente por el body, que se cree automaticamente
        (0, response_helper_1.handleErrorAddedOrUpdatedModified)(req);
        //? Guardamos el autor en la base de datos
        const newModel = new ModelRecived(req.body);
        newModel.dates = {
            created: new Date(),
            lastUpdate: new Date(),
        };
        const result = yield newModel.save();
        //? Respuestas
        res.status(201).json({
            ok: true,
            [nameModel.en_singular]: result,
            msg: "Se ha creado el " + nameModel.es_singular,
        });
    }
    catch (error) {
        (0, response_helper_1.getError)(res, error, "No se ha podido crear un nuevo " +
            nameModel.es_singular +
            " en la Base de Datos.");
    }
});
exports.createNewModel = createNewModel;
/**
 * ? GET - Recupera toda la lista de dicho modelo
 * @param req
 * @param res
 */
const getAllModel = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //? Sacamos la infromación añadida en el middleware de la request
    const { Model: ModelRecived, nameModel } = req
        .dataModel;
    try {
        //? Buscamos todos los elementos
        const results = yield ModelRecived.find({}).exec();
        //? Respuestas
        res.status(201).json({
            ok: true,
            [nameModel.en_plural]: results,
            msg: "Se ha recuperado la lista de " + nameModel.es_plural,
        });
    }
    catch (error) {
        (0, response_helper_1.getError)(res, error, "No se ha podido recuperar la lista de " +
            nameModel.es_plural +
            " de la Base de Datos.");
    }
});
exports.getAllModel = getAllModel;
/**
 * ? GET - Recupera un modelo por su Id
 * @param req
 * @param res
 */
const getModelById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //? Sacamos la infromación añadida en el middleware de la request
    const { Model: ModelRecived, nameModel } = req
        .dataModel;
    try {
        //? Buscamos el elemento por su id
        const id = req.params.id;
        const result = yield ModelRecived.findById(id).exec();
        if (!result)
            throw new Error("No se ha encontrado ningun " +
                nameModel.en_singular +
                " con la id : " +
                id);
        //? Respuestas
        res.status(201).json({
            ok: true,
            [nameModel.en_singular]: result,
            msg: "Se ha recuperado el " + nameModel.es_singular + " con Id: " + id,
        });
    }
    catch (error) {
        (0, response_helper_1.getError)(res, error, "No se ha podido recuperar el " +
            nameModel.es_singular +
            " con la Id de la Base de Datos.");
    }
});
exports.getModelById = getModelById;
/**
 * ? GET - Recuperar los modelos que coindidan con los argumentos
 * @param req
 * @param res
 */
const getModelByQuery = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //? Sacamos la infromación añadida en el middleware de la request
    const { Model: ModelRecived, nameModel } = req
        .dataModel;
    try {
        //? Argumentos recibidos por el query
        //! no son params
        const query = req.query;
        if (!query || Object.keys(query).length === 0)
            throw new Error("No existen las query en el modelo de " + nameModel.es_singular);
        //? Asignamos cada query en un objeto que usaremos para buscar en el modelo
        let objectToFind = {};
        Object.keys(query).forEach((keyQuery) => {
            //? Comprobamos que alguna de los argumentos del query exista en el modelo
            const model = ModelRecived.schema.obj;
            Object.keys(model).forEach((keyModel) => {
                if (keyModel === keyQuery && query[keyQuery] !== "") {
                    //?Asignamos el objeto con los parametros a buscar
                    objectToFind = Object.assign(Object.assign({}, objectToFind), { [keyQuery]: { $regex: query[keyQuery], $options: "i" } });
                }
            });
        });
        //? Si el objeto a buscar esta vacio, es que no hay querys que coincidan con el modelo o que sean posibles
        if (Object.keys(objectToFind).length === 0)
            throw new Error("Ninguna de las query coinciden con las key del modelo " +
                nameModel.es_singular +
                ". Se intentó buscar la siguiente query: " +
                query);
        const results = yield ModelRecived.find(objectToFind).setOptions({
            strictQuery: true,
        });
        //? Respuestas
        res.status(201).json({
            ok: true,
            [nameModel.en_plural]: results,
            msg: "Se han recuperado los " +
                nameModel.es_plural +
                " que contienen: " +
                JSON.stringify(query),
        });
    }
    catch (error) {
        (0, response_helper_1.getError)(res, error, `Ha habido un problema al intentar recuperar algun ${nameModel.es_singular} que contenga en su nombre: ${JSON.stringify(req.query)}.`);
    }
});
exports.getModelByQuery = getModelByQuery;
/**
 * ? PUT - Actualiza el modelo y devolve el anterior y el nuevo actualizado en la response
 * @param req
 * @param res
 */
const updateModel = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d;
    //? Sacamos la infromación añadida en el middleware de la request
    const { Model: ModelRecived, nameModel } = req
        .dataModel;
    const id = req.params.id;
    try {
        if (!req.body)
            throw Error("No se han recibido datos en el body de la petición");
        //? Comprobamos que no se intenta modificar la fecha de creacion o de modificacion manualmente
        (0, response_helper_1.handleErrorAddedOrUpdatedModified)(req);
        //? Recuperamos el valor actual
        const beforeModel = yield ModelRecived.findById(id);
        //? Creamos el objeto que va actualizar el modelo
        const objectToUpdate = Object.assign(Object.assign({}, req.body), { dates: beforeModel === null || beforeModel === void 0 ? void 0 : beforeModel.dates });
        //? Añadimos fecha de comienzo o completado si viene en el body; sino cogemos la que estaba, si no hay ninguna, pues undefined
        objectToUpdate.dates.started =
            ((_a = req.body.dates) === null || _a === void 0 ? void 0 : _a.started) || ((_b = beforeModel === null || beforeModel === void 0 ? void 0 : beforeModel.dates) === null || _b === void 0 ? void 0 : _b.started) || undefined;
        objectToUpdate.dates.finished =
            ((_c = req.body.dates) === null || _c === void 0 ? void 0 : _c.finished) || ((_d = beforeModel === null || beforeModel === void 0 ? void 0 : beforeModel.dates) === null || _d === void 0 ? void 0 : _d.finished) || undefined;
        //? La fecha de creación siempre se debe mantener, por lo que cogemos siempre la que estaba
        objectToUpdate.dates.created = beforeModel.dates.created;
        //? Actualizamos la ultima fecha de modiciacion
        objectToUpdate.dates.lastUpdate = new Date();
        //? Actualizamos el valor y recibimos el nuevo y el anterior
        const updatedModel = yield ModelRecived.findByIdAndUpdate(id, objectToUpdate, { new: true });
        //? Creamos un nombre para devolverlo por la api
        const model_updated = nameModel.en_singular + "_updated";
        const model_before = nameModel.en_singular + "_before";
        //? Repuestas
        res.status(201).json({
            ok: true,
            [model_updated]: updatedModel,
            [model_before]: beforeModel,
            msg: "Se ha actualizado el " + nameModel.es_singular + " con la id: " + id,
        });
    }
    catch (error) {
        (0, response_helper_1.getError)(res, error, `Ha habido un problema al intentar actualizar el ${nameModel.es_singular} con id: ${id}.`);
    }
});
exports.updateModel = updateModel;
/**
 * ? DELETE - Elimina el elemento del modelo con la id
 * @param req
 * @param res
 */
const deleteModel = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //? Sacamos la infromación añadida en el middleware de la request
    const { Model: ModelRecived, nameModel } = req
        .dataModel;
    const id = req.params.id;
    try {
        //? Eliminamos el modelo
        const model = yield ModelRecived.findByIdAndDelete(id);
        if (!model) {
            throw new Error("No se ha encotrado ningun " +
                nameModel.es_singular +
                " con el id :" +
                id);
        }
        //? Creamos un nombre para devolverlo por la api
        const model_deleted = nameModel.en_singular + "_deleted";
        //? Respuestas
        res.status(201).json({
            ok: true,
            [model_deleted]: model,
            msg: "Se ha eliminado el " + nameModel.es_singular + " con la id: " + id,
        });
    }
    catch (error) {
        (0, response_helper_1.getError)(res, error, `Ha habido un problema al intentar eliminar el ${nameModel.es_singular} con id: ${id}.`);
    }
});
exports.deleteModel = deleteModel;
/**
 * ! DELETE - Elimina la coleccion del modelo entera - CUIDADO DE USAR
 * @param req
 * @param res
 */
const deleteAllCollectionModel = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //? Sacamos la infromación añadida en el middleware de la request
    const { Model: ModelRecived, nameModel } = req
        .dataModel;
    try {
        //! Eliminamos toda la coleccion del modelo
        const result = yield ModelRecived.collection.drop();
        //? Respuestas
        res.status(201).json({
            ok: true,
            collection: result,
            msg: "Se ha eliminado la colección de " + nameModel.es_plural,
        });
    }
    catch (error) {
        (0, response_helper_1.getError)(res, error, `Ha habido un problema al intentar eliminar la colección de ${nameModel.es_plural}.`);
    }
});
exports.deleteAllCollectionModel = deleteAllCollectionModel;
/**
 * ? Test para comprobar que la ruta funciona y se recibe el objeto del middleware
 * @param req
 * @param res
 */
const testController = (req, res) => {
    res.status(200).send({
        dataModel: req.dataModel,
        message: "Soy el test",
    });
};
exports.testController = testController;
