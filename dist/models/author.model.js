"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthorModel = exports.AuthorSchema = void 0;
const mongoose_1 = require("mongoose");
const course_model_1 = require("./course.model");
const project_model_1 = require("./project.model");
const dates_schema_1 = require("./schemas/dates.schema");
const links_schema_1 = require("./schemas/links.schema");
const techs_schema_1 = require("./schemas/techs.schema");
exports.AuthorSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    image: { type: String },
    links: { type: links_schema_1.LinksSchema },
    courses: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: "Course",
            autopopulate: { maxDepth: 2 },
        },
    ],
    techs: { type: techs_schema_1.TechsSchema },
    dates: { type: dates_schema_1.DatesSchema, required: true },
});
exports.AuthorSchema.plugin(require("mongoose-autopopulate"));
//? Triggers para realizar efecto cascada en los dependientes
exports.AuthorSchema.pre("findOneAndDelete", { document: false, query: true }, function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        const doc = yield this.model.findOne(this.getFilter());
        yield course_model_1.CourseModel.deleteMany({ author: doc._id });
        yield project_model_1.ProjectModel.deleteMany({ author: doc._id });
        next();
    });
});
exports.AuthorModel = (0, mongoose_1.model)("Author", exports.AuthorSchema);
