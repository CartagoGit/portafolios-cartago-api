import { Router } from "express";
import { testController } from "../controllers/global.controller";
import {
	newAuthor,
	getAllAuthors,
	getAuthor,
	updateAuthor,
	deleteAuthor,
} from "../controllers/author.controller";

const router = Router();

//? test
router.get("/test", testController);

//? rutas para cada tipo de peticion
router.post("/new-author", newAuthor);
router.get("/get-author", getAuthor);
router.get("/get-all-authors", getAllAuthors);
router.put("/update-author", updateAuthor);
router.delete("/delete-author", deleteAuthor);

export const authorsRoutes = router;
