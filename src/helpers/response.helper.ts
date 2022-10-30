import { Response, Request } from "express";
import { colors } from "./console-log.helper";

//? metodo para recibir un error predeterminado
export const getError = (res: Response, error: any, msg: string): Response => {
	console.error(colors.fg.red + error + colors.reset);
	const errorToShow = error["errors"] || error.toString();
	return res.status(500).json({
		ok: false,
		msg: msg + " Por favor hable con el administrador",
		errors: errorToShow,
	});
};

//? Si se intenta modificar la fecha de creación o la ultima de modificacion, salta error
export const handleErrorAddedOrUpdatedModified = (req: Request) => {
	if (!!req.body.dates?.added || !!req.body.dates?.lastUpdate)
		throw new Error(
			"No se pueden modificar manualmente las fechas de creación o de modificación"
		);
};

//? Creamos un nuevo modelo
export const createNewModel = async (ModelRecived: any, req: Request) => {
	const newModel = new ModelRecived(req.body);
	console.log(newModel);
	newModel.dates = {
		added: new Date(),
		lastUpdate: new Date(),
	};
	return await newModel.save();
};

//? Actualizamos el modelo y devolvemos el anterior y el nuevo actualizado
export const updateModel = async (ModelRecived: any, req: Request) => {
	const id = req.params.id;
	const beforeModel = await ModelRecived.findById(id);
	const updatedModel = await ModelRecived.findByIdAndUpdate(
		id,
		{ ...req.body, lastUpdate: new Date() },
		{ new: true }
	);
	return { beforeModel, updatedModel };
};
