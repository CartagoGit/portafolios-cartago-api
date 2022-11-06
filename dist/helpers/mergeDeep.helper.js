"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mergeDeep = exports.isObject = void 0;
/**
 * Comprueba si el argumento es un objeto.
 * @param item
 * @returns {boolean}
 */
function isObject(item) {
    return (item && typeof item === "object" && !Array.isArray(item) && item !== null);
}
exports.isObject = isObject;
/**
 * Deep merge de dos objetos.
 * @param target
 * @param source
 * @returns {object}
 */
function mergeDeep(target, source) {
    if (isObject(target) && isObject(source)) {
        for (const key in source) {
            if (isObject(source[key])) {
                if (!target[key])
                    Object.assign(target, { [key]: {} });
                mergeDeep(target[key], source[key]);
            }
            else {
                Object.assign(target, { [key]: source[key] });
            }
        }
    }
    return target;
}
exports.mergeDeep = mergeDeep;
