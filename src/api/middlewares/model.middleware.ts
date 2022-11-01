import { Request, Response, NextFunction } from "express";
import { AuthorModel } from "../../models/author.model";
import { CourseModel } from "../../models/course.model";
import { ProjectModel } from "../../models/project.model";
import {
	INameModel,
	IRequestModel,
	IDataModel,
} from "../interfaces/model.interfaces";

//? Creamos un middleware que pasara la información del modelo a traves del request
class ModelMiddleware {
	private _Model = async (
		req: IRequestModel,
		res: Response,
		next: NextFunction,
		dataModel: IDataModel
	) => {
		try {
			req.dataModel = dataModel;
			next();
		} catch (error) {
			res.status(500).send({
				message: "Hubo un error al parsear la información en el middleware",
			});
		}
	};

	//? Desde aqui añadimos a cada request la información que deseamos
	public Authors = (req: Request, res: Response, next: NextFunction) => {
		const nameModel: INameModel = {
			es_singular: "autor",
			es_plural: "autores",
			en_singular: "author",
			en_plural: "authors",
		};
		const Model = AuthorModel;
		const dataModel: IDataModel = {
			nameModel,
			Model,
		};
		this._Model(req as IRequestModel, res, next, dataModel);
	};

	public Courses = (req: Request, res: Response, next: NextFunction) => {
		const nameModel: INameModel = {
			es_singular: "curso",
			es_plural: "cursos",
			en_singular: "course",
			en_plural: "courses",
		};
		const Model = CourseModel;
		const dataModel: IDataModel = {
			nameModel,
			Model,
		};
		this._Model(req as IRequestModel, res, next, dataModel);
	};

	public Projects = (req: Request, res: Response, next: NextFunction) => {
		const nameModel: INameModel = {
			es_singular: "proyecto",
			es_plural: "proyectos",
			en_singular: "project",
			en_plural: "projects",
		};
		const Model = ProjectModel;
		const dataModel: IDataModel = {
			nameModel,
			Model,
		};
		this._Model(req as IRequestModel, res, next, dataModel);
	};
}

export const modelMiddleware = new ModelMiddleware();
