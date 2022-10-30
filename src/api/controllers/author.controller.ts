import { Request, Response } from "express";
import { getError } from "../../helpers/response.helper";
import { AuthorModel } from "../../models/author.model";

//? POST - Crear Autor
export const newAuthor = async (req: Request, res: Response): Promise<void> => {
	try {
		//? Guardamos el autor en la base de datos
		const author = req.body;
		const model = new AuthorModel(author);
		const result = await model.save();
		const _id = result._id;

		res.status(201).json({
			ok: true,
			author: { id: _id, ...author },
			msg: "Se ha creado el autor",
		});
	} catch (error) {
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
		const authors = await AuthorModel.find({});
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
		const author_before = await AuthorModel.findById(id);
		const author = await AuthorModel.findByIdAndUpdate(id, req.body, {
			new: true,
		});
		res.status(201).json({
			ok: true,
			author_updated: author,
			author_before,
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
