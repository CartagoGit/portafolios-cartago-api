"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const config_1 = __importDefault(require("./environments/config"));
const console_log_helper_1 = require("../helpers/console-log.helper");
//? Pintamos el logo
console.log(console_log_helper_1.colors.fg.blue + console_log_helper_1.logoAscii + console_log_helper_1.colors.reset);
const app = (0, express_1.default)();
app.get("/", (_req, res) => {
    res.send({
        message: `Hello World!`,
    });
});
//? Creamos la llamada al servidor
app.listen(config_1.default.PORT, config_1.default.HOST, () => {
    console.log(`
        Server in mode ${console_log_helper_1.colors.fg.cyan + config_1.default.NODE_ENV + console_log_helper_1.colors.reset}
        Running on ${console_log_helper_1.colors.fg.magenta + config_1.default.HOST}:${console_log_helper_1.colors.fg.red + config_1.default.PORT + console_log_helper_1.colors.reset} 
        from ${console_log_helper_1.colors.fg.yellow + config_1.default.FROM + console_log_helper_1.colors.reset}`);
    console.log();
});
