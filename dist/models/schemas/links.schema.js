"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LinksSchema = void 0;
const mongoose_1 = require("mongoose");
exports.LinksSchema = new mongoose_1.Schema({
    personal: { type: String },
    github: { type: String },
    udemy: { type: String },
    twitter: { type: String },
    linkedin: { type: String },
    youtube: { type: String },
    instagram: { type: String },
    tiktok: { type: String },
    others: { type: [String], default: undefined },
}, { _id: false });
