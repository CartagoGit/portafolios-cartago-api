import { Router } from "express";
import { testController } from "../controllers/global.controller";
import {
	newAuthor,
	getAllAuthors,
	getAuthorById,
	updateAuthor,
	deleteAuthor,
	getAuthorsByName,
} from "../controllers/author.controller";

const router = Router();

//? test
router.get("/test", testController);

//? Rutas para cada tipo de peticion
router.post("/new-author", newAuthor);
router.get("/get-all-authors", getAllAuthors);
router.get("/get-author-by-id/:id", getAuthorById);
router.get("/get-authors-by-name/:name", getAuthorsByName);
router.put("/update-author/:id", updateAuthor);
router.delete("/delete-author/:id", deleteAuthor);

export const authorsRoutes = router;
