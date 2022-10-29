import { Request, Response } from "express";
import { getError } from "../../helpers/response.helper";
import { AuthorModel } from "../../models/author.model";

//? POST - Crear Autor
export const newAuthor = async (
	req: Request,
	res: Response
): Promise<Response> => {
	try {
		//? Guardamos el autor en la base de datos
		const autor = req.body;
		const model = new AuthorModel(autor);
		model.save();

		return res.status(201).json({
			ok: true,
			autor: { autor },
			msg: "Se ha creado el autor",
		});
	} catch (error) {
		return getError(
			res,
			error,
			"No se ha podido crear el autor en la Base de Datos."
		);
	}
};

//? GET - Recuperar un author por Id
export const getAuthor = (_req: Request, res: Response) => {
	try {
	} catch (error) {}
};

//? GET - Recuperar lista de autores
export const getAllAuthors = (_req: Request, res: Response) => {};

//? PUT - Actualizar Autor
export const updateAuthor = (_req: Request, res: Response) => {};

//? DELETE - Eliminar Autor
export const deleteAuthor = (_req: Request, res: Response) => {};
