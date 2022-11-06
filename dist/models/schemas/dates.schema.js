"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatesSchema = void 0;
const mongoose_1 = require("mongoose");
exports.DatesSchema = new mongoose_1.Schema({
    created: { type: Date, required: true, default: new Date(0) },
    lastUpdate: { type: Date, required: true, default: new Date(0) },
    started: { type: Date, default: undefined },
    finished: { type: Date, default: undefined },
}, { _id: false });
