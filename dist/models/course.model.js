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
exports.CourseModel = exports.CourseSchema = void 0;
const mongoose_1 = require("mongoose");
const dates_schema_1 = require("./schemas/dates.schema");
const project_model_1 = require("./project.model");
const author_model_1 = require("./author.model");
const techs_schema_1 = require("./schemas/techs.schema");
exports.CourseSchema = new mongoose_1.Schema({
    title: { type: String, required: true },
    subtitle: { type: String, required: true },
    link: { type: String, required: true },
    description: { type: String },
    githubCartago: { type: String },
    githubCourse: { type: String },
    linkCertificatePdf: { type: String },
    author: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Author",
        required: true,
        autopopulate: { maxDepth: 1 },
    },
    projects: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: "Project",
            autopopulate: { maxDepth: 1 },
        },
    ],
    techs: { type: techs_schema_1.TechsSchema },
    dates: { type: dates_schema_1.DatesSchema, required: true },
});
exports.CourseSchema.plugin(require("mongoose-autopopulate"));
//? Triggers para realizar efecto cascada en los dependientes
exports.CourseSchema.post("findOneAndDelete", { document: false, query: true }, function (doc, next) {
    return __awaiter(this, void 0, void 0, function* () {
        yield project_model_1.ProjectModel.deleteMany({ course: doc._id });
        yield author_model_1.AuthorModel.updateOne({ _id: doc.author._id }, { $pull: { courses: doc._id } });
        next();
    });
});
//? Al guardar añadir el curso al autor
exports.CourseSchema.post("save", function (doc, next) {
    return __awaiter(this, void 0, void 0, function* () {
        yield author_model_1.AuthorModel.updateOne({ _id: doc.author._id }, { $push: { courses: doc._id } }, { new: true });
        next();
    });
});
//? Actualizamos el curso en los autores
exports.CourseSchema.post("findOneAndUpdate", { document: false, query: true }, function (doc, next) {
    return __awaiter(this, void 0, void 0, function* () {
        //? Eliminamos el curso del autor en el que estaba
        yield author_model_1.AuthorModel.updateOne({ courses: doc._id }, {
            $pull: { courses: doc._id },
        });
        //? Añadimos al nuevo autor
        yield author_model_1.AuthorModel.updateOne({ _id: doc.author._id }, { $push: { courses: doc._id } });
        next();
    });
});
exports.CourseModel = (0, mongoose_1.model)("Course", exports.CourseSchema);
