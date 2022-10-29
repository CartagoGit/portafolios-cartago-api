import { Request, Response } from "express";

//? Un test
export const testController = (_req: Request, res: Response) => {
	res.status(200).send({
		message: "Soy el test",
	});
};
