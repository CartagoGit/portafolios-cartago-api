"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const config_1 = __importDefault(require("./environments/config"));
const console_log_helper_1 = require("../helpers/console-log.helper");
const mongo_db_1 = require("../db/mongo.db");
const model_routes_1 = require("../api/routes/model.routes");
//? Pintamos el logo
console.log(console_log_helper_1.colors.fg.blue + console_log_helper_1.logoAscii + console_log_helper_1.colors.reset);
//? Creamos el servidor
const app = (0, express_1.default)();
//? Creamos la subscripcion a mongo para conectarnos a la BD
(0, mongo_db_1.createMongoConection)().subscribe({
    next: (_resp) => {
        console.log(console_log_helper_1.colors.fg.green + "Connected successfully with MongoDB" + console_log_helper_1.colors.reset);
        //$ Una vez nos hemos conectado a mongoDB
        //? Activamos los cors en nuestro servidor
        app.use((0, cors_1.default)());
        //? Activamos proteccion para vulnerabilidades conocidas de las web
        app.use((0, helmet_1.default)());
        //? Parseamos el body para convertir todo lo pasado en json
        app.use(express_1.default.json());
        //? Parseamos el servidor para que acepte x-www-form-urlencoded
        app.use(express_1.default.urlencoded({ extended: true }));
        //? Colocamos las rutas del servidor
        app.use("/api", model_routes_1.router);
        //? Manejamos la respuesta en el resto de rutas
        app.get("*", (_req, res) => {
            res.send("There isn't any route for this endpoint");
        });
        //? Creamos la llamada al servidor
        app.listen(config_1.default.PORT, config_1.default.HOST, () => {
            //? Mensaje con los datos del environment
            console.log((0, console_log_helper_1.messageInitServidor)(config_1.default));
            console.log("");
        });
    },
    error: (err) => {
        console.log(console_log_helper_1.colors.fg.red + "Error in conection with MongoDB");
        console.log(err + console_log_helper_1.colors.reset);
    },
});
