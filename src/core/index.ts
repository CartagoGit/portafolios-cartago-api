import express, { Application } from "express";
import config from "./environments/config";
import {
	logoAscii,
	colors,
	messageInitServidor,
} from "../helpers/console-log.helper";

//? Pintamos el logo
console.log(colors.fg.blue + logoAscii + colors.reset);
const app: Application = express();

app.get("/", (_req, res) => {
	res.send({
		message: `Hello World!`,
	});
});

//? Creamos la llamada al servidor
app.listen(config.PORT as number, config.HOST, () => {
	console.log(messageInitServidor);
});
