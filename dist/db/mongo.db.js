"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createMongoConection = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const rxjs_1 = require("rxjs");
const config_1 = __importDefault(require("../core/environments/config"));
/**
 * ? Observable para la conexion con mongoDB
 * @returns {Observable<typeof mongoose>}
 */
const createMongoConection = () => {
    console.log("Creating connection to MongoDB");
    return (0, rxjs_1.from)(mongoose_1.default.connect(config_1.default.MONGODB_CONNECT, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }));
};
exports.createMongoConection = createMongoConection;
