import { Response } from "express";

export const getError = (
	res: Response,
	error: unknown,
	msg: string
): Response => {
	console.error(error);
	return res.status(500).json({
		ok: false,
		msg: msg + " Por favor hable con el administrador",
	});
};
