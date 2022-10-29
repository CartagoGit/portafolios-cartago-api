"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const dotenv_1 = __importDefault(require("dotenv"));
const dotEnvResult = dotenv_1.default.config({
    path: 
    // __dirname + "/.env" + process.env.NODE_ENV === "production" ? ".prod" : "",
    __dirname +
        "/.env" +
        (process.env.NODE_ENV === "production" ? ".prod" : ""),
});
if (dotEnvResult.error) {
    throw dotEnvResult.error;
}
module.exports = {
    FROM: process.env.FROM || "auxiliar testing variables",
    NODE_ENV: process.env.NODE_ENV || "development",
    HOST: process.env.HOST || "localhost",
    PORT: process.env.PORT || 5000,
};
