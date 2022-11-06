import { Response, Request } from "express";
import {
	getError,
	handleErrorAddedOrUpdatedModified,
} from "../../helpers/response.helper";
import { IRequestModel, IDataModel } from "../interfaces/model.interfaces";

//$ Controllador general de todos los cruds basicos

//? POST -  Creamos un nuevo modelo
export const createNewModel = async (req: Request, res: Response) => {
	//? Sacamos la infromación añadida en el middleware de la request
	const { Model: ModelRecived, nameModel }: IDataModel = (req as IRequestModel)
		.dataModel;

	try {
		if (!req.body)
			throw Error("No se han recibido datos en el body de la petición");
		//? Comprobamos que no se pase ninguna fecha directamente por el body, que se cree automaticamente
		handleErrorAddedOrUpdatedModified(req);

		//? Guardamos el autor en la base de datos
		const newModel = new ModelRecived(req.body);
		newModel.dates = {
			created: new Date(),
			lastUpdate: new Date(),
		};
		const result = await newModel.save();

		//? Respuestas
		res.status(201).json({
			ok: true,
			[nameModel.en_singular]: result,
			msg: "Se ha creado el " + nameModel.es_singular,
		});
	} catch (error: any) {
		getError(
			res,
			error,
			"No se ha podido crear un nuevo " +
				nameModel.es_singular +
				" en la Base de Datos."
		);
	}
};

//? GET - Recuperar toda la lista de dicho modelo
export const getAllModel = async (req: Request, res: Response) => {
	//? Sacamos la infromación añadida en el middleware de la request
	const { Model: ModelRecived, nameModel }: IDataModel = (req as IRequestModel)
		.dataModel;
	try {
		//? Buscamos todos los elementos
		const results = await ModelRecived.find({}).exec();

		//? Respuestas
		res.status(201).json({
			ok: true,
			[nameModel.en_plural]: results,
			msg: "Se ha recuperado la lista de " + nameModel.es_plural,
		});
	} catch (error) {
		getError(
			res,
			error,
			"No se ha podido recuperar la lista de " +
				nameModel.es_plural +
				" de la Base de Datos."
		);
	}
};

//? GET - Recuperar un modelo por su Id
export const getModelById = async (req: Request, res: Response) => {
	//? Sacamos la infromación añadida en el middleware de la request
	const { Model: ModelRecived, nameModel }: IDataModel = (req as IRequestModel)
		.dataModel;

	try {
		//? Buscamos el elemento por su id
		const id = req.params.id;
		const result = await ModelRecived.findById(id).exec();
		if (!result)
			throw new Error(
				"No se ha encontrado ningun " +
					nameModel.en_singular +
					" con la id : " +
					id
			);
		//? Respuestas
		res.status(201).json({
			ok: true,
			[nameModel.en_singular]: result,
			msg: "Se ha recuperado el " + nameModel.es_singular + " con Id: " + id,
		});
	} catch (error) {
		getError(
			res,
			error,
			"No se ha podido recuperar el " +
				nameModel.es_singular +
				" con la Id de la Base de Datos."
		);
	}
};

//? Get - Recuperar un modelo por su variable
export const getModelByQuery = async (req: Request, res: Response) => {
	//? Sacamos la infromación añadida en el middleware de la request
	const { Model: ModelRecived, nameModel }: IDataModel = (req as IRequestModel)
		.dataModel;

	try {
		//? Argumentos recibidos por el query
		//! no son params
		const query = req.query;
		if (!query || Object.keys(query).length === 0)
			throw new Error(
				"No existen las query en el modelo de " + nameModel.es_singular
			);

		//? Asignamos cada query en un objeto que usaremos para buscar en el modelo
		let objectToFind = {};
		Object.keys(query).forEach((keyQuery) => {
			//? Comprobamos que alguna de los argumentos del query exista en el modelo
			const model = ModelRecived.schema.obj;
			Object.keys(model).forEach((keyModel) => {
				if (keyModel === keyQuery && query[keyQuery] !== "") {
					//?Asignamos el objeto con los parametros a buscar
					objectToFind = {
						...objectToFind,
						[keyQuery]: { $regex: query[keyQuery], $options: "i" },
					};
				}
			});
		});

		//? Si el objeto a buscar esta vacio, es que no hay querys que coincidan con el modelo o que sean posibles
		if (Object.keys(objectToFind).length === 0)
			throw new Error(
				"Ninguna de las query coinciden con las key del modelo " +
					nameModel.es_singular +
					". Se intentó buscar la siguiente query: " +
					query
			);

		const results = await ModelRecived.find(objectToFind).setOptions({
			strictQuery: true,
		});

		//? Respuestas
		res.status(201).json({
			ok: true,
			[nameModel.en_plural]: results,
			msg:
				"Se han recuperado los " +
				nameModel.es_plural +
				" que contienen: " +
				JSON.stringify(query),
		});
	} catch (error) {
		getError(
			res,
			error,
			`Ha habido un problema al intentar recuperar algun ${
				nameModel.es_singular
			} que contenga en su nombre: ${JSON.stringify(req.query)}.`
		);
	}
};
//? PUT - Actualizamos el modelo y devolvemos el anterior y el nuevo actualizado
export const updateModel = async (req: Request, res: Response) => {
	//? Sacamos la infromación añadida en el middleware de la request
	const { Model: ModelRecived, nameModel }: IDataModel = (req as IRequestModel)
		.dataModel;
	const id = req.params.id;

	try {
		if (!req.body)
			throw Error("No se han recibido datos en el body de la petición");
		//? Comprobamos que no se intenta modificar la fecha de creacion o de modificacion manualmente
		handleErrorAddedOrUpdatedModified(req);

		//? Recuperamos el valor actual
		const beforeModel = await ModelRecived.findById(id);
		//? Creamos el objeto que va actualizar el modelo
		const objectToUpdate = { ...req.body, dates: beforeModel?.dates };

		//? Añadimos fecha de comienzo o completado si viene en el body; sino cogemos la que estaba, si no hay ninguna, pues undefined
		objectToUpdate.dates.started =
			req.body.dates?.started || beforeModel?.dates?.started || undefined;
		objectToUpdate.dates.finished =
			req.body.dates?.finished || beforeModel?.dates?.finished || undefined;

		//? La fecha de creación siempre se debe mantener, por lo que cogemos siempre la que estaba
		objectToUpdate.dates.created = beforeModel.dates.created;
		//? Actualizamos la ultima fecha de modiciacion
		objectToUpdate.dates.lastUpdate = new Date();

		//? Actualizamos el valor y recibimos el nuevo y el anterior
		const updatedModel = await ModelRecived.findByIdAndUpdate(
			id,
			objectToUpdate,
			{ new: true }
		);

		//? Creamos un nombre para devolverlo por la api
		const model_updated = nameModel.en_singular + "_updated";
		const model_before = nameModel.en_singular + "_before";

		//? Repuestas
		res.status(201).json({
			ok: true,
			[model_updated]: updatedModel,
			[model_before]: beforeModel,
			msg:
				"Se ha actualizado el " + nameModel.es_singular + " con la id: " + id,
		});
	} catch (error) {
		getError(
			res,
			error,
			`Ha habido un problema al intentar actualizar el ${nameModel.es_singular} con id: ${id}.`
		);
	}
};

//? DELETE - Eliminamos el elemento del modelo con la id
export const deleteModel = async (req: Request, res: Response) => {
	//? Sacamos la infromación añadida en el middleware de la request
	const { Model: ModelRecived, nameModel }: IDataModel = (req as IRequestModel)
		.dataModel;
	const id = req.params.id;
	try {
		//? Eliminamos el modelo
		const model = await ModelRecived.findByIdAndDelete(id);
		if (!model) {
			throw new Error(
				"No se ha encotrado ningun " +
					nameModel.es_singular +
					" con el id :" +
					id
			);
		}
		//? Creamos un nombre para devolverlo por la api
		const model_deleted = nameModel.en_singular + "_deleted";

		//? Respuestas
		res.status(201).json({
			ok: true,
			[model_deleted]: model,
			msg: "Se ha eliminado el " + nameModel.es_singular + " con la id: " + id,
		});
	} catch (error) {
		getError(
			res,
			error,
			`Ha habido un problema al intentar eliminar el ${nameModel.es_singular} con id: ${id}.`
		);
	}
};

//! DELETE - Elimina la coleccion del modelo entera - CUIDADO DE USAR

export const deleteAllCollectionModel = async (req: Request, res: Response) => {
	//? Sacamos la infromación añadida en el middleware de la request
	const { Model: ModelRecived, nameModel }: IDataModel = (req as IRequestModel)
		.dataModel;

	try {
		//! Eliminamos toda la coleccion del modelo
		const result = await ModelRecived.collection.drop();

		//? Respuestas
		res.status(201).json({
			ok: true,
			collection: result,
			msg: "Se ha eliminado la colección de " + nameModel.es_plural,
		});
	} catch (error) {
		getError(
			res,
			error,
			`Ha habido un problema al intentar eliminar la colección de ${nameModel.es_plural}.`
		);
	}
};

//? Un test para comprobar que la ruta funciona y se recibe el objeto del middleware
export const testController = (req: Request, res: Response) => {
	res.status(200).send({
		dataModel: (req as IRequestModel).dataModel,
		message: "Soy el test",
	});
};
