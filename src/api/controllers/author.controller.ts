import { Request, Response } from "express";
import {
	handleErrorAddedOrUpdatedModified,
	getError,
	createNewModel,
	updateModel,
} from "../../helpers/response.helper";
import { AuthorModel } from "../../models/author.model";

//? POST - Crear Autor
export const newAuthor = async (req: Request, res: Response): Promise<void> => {
	try {
		//? Comprobamos que no se pase ninguna fecha directamente por el body, que se cree automaticamente
		handleErrorAddedOrUpdatedModified(req);

		//? Guardamos el autor en la base de datos
		const result = await createNewModel(AuthorModel, req);

		res.status(201).json({
			ok: true,
			author: result,
			msg: "Se ha creado el autor",
		});
	} catch (error: any) {
		getError(
			res,
			error,
			"No se ha podido crear un nuevo autor en la Base de Datos."
		);
	}
};
//? GET - Recuperar lista de autores
export const getAllAuthors = async (_req: Request, res: Response) => {
	try {
		const authors = await AuthorModel.find({}).exec();
		res.status(201).json({
			ok: true,
			authors,
			msg: "Se ha recuperado la lista de autores",
		});
	} catch (error) {
		getError(
			res,
			error,
			"No se ha podido recuperar la lista de autores de la Base de Datos."
		);
	}
};

//? GET - Recuperar un author por Id
export const getAuthorById = async (req: Request, res: Response) => {
	try {
		const id = req.params.id;
		const author = await AuthorModel.findById(id).exec();
		res.status(201).json({
			ok: true,
			author,
			msg: "Se ha recuperado el autor con Id: " + id,
		});
	} catch (error) {
		getError(
			res,
			error,
			"No se ha podido recuperar el autor con la ID de la Base de Datos."
		);
	}
};
//? GET - Recuperar autores que contengan en su Nombre
export const getAuthorsByName = async (req: Request, res: Response) => {
	const name = req.params.name;
	try {
		const authors = await AuthorModel.find({
			name: { $regex: name, $options: "i" },
		}).exec();
		res.status(201).json({
			ok: true,
			authors,
			msg: "Se ha recuperado los autores que en su nombre contienen: " + name,
		});
	} catch (error) {
		getError(
			res,
			error,
			`Ha habido un problema al intentar recuperar algun autor que contenga en su nombre: ${name}.`
		);
	}
};

//? PUT - Actualizar Autor
export const updateAuthor = async (req: Request, res: Response) => {
	const id = req.params.id;
	try {
		//? Comprobamos que no se intenta modificar la fecha de creacion o de modificacion manualmente
		handleErrorAddedOrUpdatedModified(req);

		//? Actualizamos el valor y recibimos el nuevo y el anterior
		const { beforeModel, updatedModel } = await updateModel(AuthorModel, req);

		res.status(201).json({
			ok: true,
			author_updated: updatedModel,
			author_before: beforeModel,
			msg: "Se ha actualidado el autor con la id: " + id,
		});
	} catch (error) {
		getError(
			res,
			error,
			`Ha habido un problema al intentar actualizar el autor con id: ${id}.`
		);
	}
};

//? DELETE - Eliminar Autor
export const deleteAuthor = async (req: Request, res: Response) => {
	const id = req.params.id;
	try {
		const author = await AuthorModel.findByIdAndDelete(id);
		res.status(201).json({
			ok: true,
			author_deleted: author,
			msg: "Se ha eliminado el autor con la id: " + id,
		});
	} catch (error) {
		getError(
			res,
			error,
			`Ha habido un problema al intentar eliminar el autor con id: ${id}.`
		);
	}
};
