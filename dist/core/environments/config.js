"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MONGODB_CONNECT = exports.PORT = exports.HOST = exports.NODE_ENV = exports.FROM = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const console_log_helper_1 = require("../../helpers/console-log.helper");
//? Si estamos en desarrollo añadimos las variables de entorno al process.env con dotenv
if (process.env.NODE_ENV === "development") {
    const dotEnvResult = dotenv_1.default.config({
        path: __dirname + "/.env",
        // +
        // (process.env.NODE_ENV === "production" ? ".prod" : ""),
    });
    if (dotEnvResult.error) {
        console.log(console_log_helper_1.colors.fg.red +
            "Got an error looking for the environment variables" +
            console_log_helper_1.colors.reset);
        console.log(console_log_helper_1.colors.fg.yellow + dotEnvResult.error + console_log_helper_1.colors.reset);
        throw dotEnvResult.error;
    }
}
//? Si no se encuentran las variables de entorno usa las variables de testing
/**
 * ? Procedencia de las variables de entorno
 */
exports.FROM = process.env.FROM || "auxiliar testing variables";
/**
 * ? Tipo de desarrollo (development | production)
 */
exports.NODE_ENV = process.env.NODE_ENV || "development";
/**
 * ? Lugar de host del servidor
 */
exports.HOST = process.env.HOST || "localhost";
/**
 * ? Puerto del servidor
 */
exports.PORT = process.env.PORT || 5000;
/**
 * ? Dirección de conexion con la base de datos Mongo
 */
exports.MONGODB_CONNECT = process.env.MONGODB_CONNECT;
/**
 * Objeto config que exporta todas las variables de entorno
 */
exports.default = {
    FROM: exports.FROM,
    NODE_ENV: exports.NODE_ENV,
    HOST: exports.HOST,
    PORT: exports.PORT,
    MONGODB_CONNECT: exports.MONGODB_CONNECT,
};
