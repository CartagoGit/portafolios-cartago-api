import express, { Application } from "express";
import cors from "cors";

import config from "./environments/config";
import {
	logoAscii,
	colors,
	messageInitServidor,
} from "../helpers/console-log.helper";

import { createMongoConection } from "../db/mongo.db";
import { setDb } from "../db/state.db";
import { globalRoutes } from "../api/routes/global.route";

//? Pintamos el logo
console.log(colors.fg.blue + logoAscii + colors.reset);

//? Creamos el servidor
const app: Application = express();

//? Creamos la subscripcion a mongo para conectarnos a la BD
createMongoConection().subscribe({
	next: (resp) => {
		//? Guardamos la conexion correcta en nuestro variable de base de datos
		const db = resp.connection;
		setDb(db);
		console.log(
			colors.fg.green + "Connected successfully with MongoDB" + colors.reset
		);

		//$ Una vez nos hemos conectado a mongoDB
		//? Activamos los cors en nuestro servidor
		app.use(cors());

		//? Parseamos el body para convertir todo lo pasado en json
		app.use(express.json());

		//? Colocamos las rutas del servidor
		app.use("/api", globalRoutes);

		//? Manejamos la respuesta en el resto de rutas
		app.get("*", (_req, res) => {
			res.send("There isn't any route for this endpoint");
		});

		//? Creamos la llamada al servidor
		app.listen(config.PORT as number, config.HOST, () => {
			//? Mensaje con los datos del environment
			console.log(messageInitServidor);
			console.log("");
		});
	},
	error: (err) => {
		console.log(colors.fg.red + "Error in conection with MongoDB");
		console.log(err + colors.reset);
	},
});
