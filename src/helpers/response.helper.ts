import { Response } from "express";
import { colors } from "./console-log.helper";

export const getError = (res: Response, error: any, msg: string): Response => {
	console.error(colors.fg.red + error + colors.reset);
	return res.status(500).json({
		ok: false,
		msg: msg + " Por favor hable con el administrador",
		errors: error["errors"] || error,
	});
};
