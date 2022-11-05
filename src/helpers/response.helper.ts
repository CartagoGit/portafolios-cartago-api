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


