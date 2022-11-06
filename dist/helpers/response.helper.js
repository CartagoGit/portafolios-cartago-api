"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleErrorAddedOrUpdatedModified = exports.getError = void 0;
const console_log_helper_1 = require("./console-log.helper");
/**
 * ? Metodo para recibir un error predeterminado y devolverlo como response
 * @param res
 * @param error
 * @param msg
 * @returns
 */
const getError = (res, error, msg) => {
    console.error(console_log_helper_1.colors.fg.red + error + console_log_helper_1.colors.reset);
    const errorToShow = error["errors"] || error.toString();
    return res.status(500).json({
        ok: false,
        msg: msg + " Por favor hable con el administrador",
        errors: errorToShow,
    });
};
exports.getError = getError;
/**
 * ? Si se intenta modificar la fecha de creación o la ultima de modificacion, salta error
 * @param req
 */
const handleErrorAddedOrUpdatedModified = (req) => {
    var _a, _b;
    if (!!((_a = req.body.dates) === null || _a === void 0 ? void 0 : _a.added) || !!((_b = req.body.dates) === null || _b === void 0 ? void 0 : _b.lastUpdate))
        throw new Error("No se pueden modificar manualmente las fechas de creación o de modificación");
};
exports.handleErrorAddedOrUpdatedModified = handleErrorAddedOrUpdatedModified;
