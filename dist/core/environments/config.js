"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
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
module.exports = {
    FROM: process.env.FROM || "auxiliar testing variables",
    NODE_ENV: process.env.NODE_ENV || "development",
    HOST: process.env.HOST || "localhost",
    PORT: process.env.PORT || 5000,
    MONGODB_CONNECT: process.env.MONGODB_CONNECT,
};
