import { Request, Response, NextFunction } from "express";
import { dataModels } from "../data/data-models.data";
import { IRequestModel, IDataModel } from "../interfaces/model.interfaces";

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
		this._Model(req as IRequestModel, res, next, dataModels.authors);
	};

	public Courses = (req: Request, res: Response, next: NextFunction) => {
		this._Model(req as IRequestModel, res, next, dataModels.courses);
	};

	public Projects = (req: Request, res: Response, next: NextFunction) => {
		this._Model(req as IRequestModel, res, next, dataModels.projects);
	};
}

export const modelMiddleware = new ModelMiddleware();
