import express, { Application } from "express";
import cors from "cors";
import helmet from "helmet";

import config from "./environments/config";
import {
	logoAscii,
	colors,
	messageInitServidor,
} from "../helpers/console-log.helper";
import { createMongoConection } from "../db/mongo.db";
import { router } from "../api/routes/model.routes";

//? Pintamos el logo
console.log(colors.fg.blue + logoAscii + colors.reset);

//? Controlamos que si no hay ninguna direccion en las variables de entorno para la base de datos, salte un error antes
if (!config.MONGODB_CONNECT)
	throw new Error(
		colors.fg.red +
			"No existe ninguna dirección para conectarse a la base de datos" +
			colors.reset
	);

//? Creamos el servidor
const app: Application = express();

//? Creamos la subscripcion a mongo para conectarnos a la BD
createMongoConection().subscribe({
	next: (_resp) => {
		console.log(
			colors.fg.green + "Connected successfully with MongoDB" + colors.reset
		);

		//$ Una vez nos hemos conectado a mongoDB
		//? Activamos los cors en nuestro servidor
		app.use(cors());

		//? Activamos proteccion para vulnerabilidades conocidas de las web
		app.use(helmet());

		//? Parseamos el body para convertir todo lo pasado en json
		app.use(express.json());

		//? Parseamos el servidor para que acepte x-www-form-urlencoded
		app.use(express.urlencoded({ extended: true }));

		//? Colocamos las rutas del servidor
		app.use("/api", router);

		//? Manejamos la respuesta en el resto de rutas
		app.get("*", (_req, res) => {
			res.send("There isn't any route for this endpoint");
		});
		
		//? Creamos la llamada al servidor
		// app.listen(config.PORT as number, () => {
		// 	//? Mensaje con los datos del environment
		// 	console.log(messageInitServidor(config));
		// 	console.log("");
		// });
	},
	error: (err) => {
		console.log(colors.fg.red + "Error in conection with MongoDB");
		console.log(err + colors.reset);
	},
});
