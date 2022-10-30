import { Request, Response } from "express";
import { AuthorModel } from "../../models/author.model";
import { getModelByArgs, INameModel } from "./crud-base.controller";
import {
	createNewModel,
	getAllModel,
	getModelById,
	updateModel,
	deleteModel,
} from "./crud-base.controller";

const nameModel: INameModel = {
	es_singular: "autor",
	es_plural: "autores",
	en_singular: "author",
	en_plural: "authors",
};
const Model = AuthorModel;

//? POST - Crear Autor
export const newAuthor = async (req: Request, res: Response) => {
	await createNewModel(Model, req, res, nameModel);
};
//? GET - Recuperar lista de autores
export const getAllAuthors = async (req: Request, res: Response) => {
	await getAllModel(Model, req, res, nameModel);
};

//? GET - Recuperar un author por Id
export const getAuthorById = async (req: Request, res: Response) => {
	await getModelById(Model, req, res, nameModel);
};
//? GET - Recuperar autores que contengan en su Nombre
export const getAuthorsByName = async (req: Request, res: Response) => {
	getModelByArgs(Model, req, res, nameModel);
};

//? PATCH // PUT - Actualizar Autor
export const updateAuthor = async (req: Request, res: Response) => {
	await updateModel(Model, req, res, nameModel);
};

//? DELETE - Eliminar Autor
export const deleteAuthor = async (req: Request, res: Response) => {
	await deleteModel(Model, req, res, nameModel);
};
