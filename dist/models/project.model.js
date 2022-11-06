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
exports.ProjectModel = exports.ProjectSchema = void 0;
const mongoose_1 = require("mongoose");
const course_model_1 = require("./course.model");
const dates_schema_1 = require("./schemas/dates.schema");
const techs_schema_1 = require("./schemas/techs.schema");
exports.ProjectSchema = new mongoose_1.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    githubCartago: { type: String },
    githubCourse: { type: String },
    useTo: {
        type: String,
        required: true,
        enum: ["Course", "Testing", "Own", "Teach", "Data"],
        //* Proyecto creado para - Cursos, Testear, Propios, Enseñar, Guardar información
    },
    course: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Course",
        autopopulate: { maxDepth: 2 },
    },
    techs: { type: techs_schema_1.TechsSchema },
    dates: { type: dates_schema_1.DatesSchema, required: true },
});
exports.ProjectSchema.plugin(require("mongoose-autopopulate"));
//? Triggers para realizar efecto cascada en los dependientes
exports.ProjectSchema.post("findOneAndDelete", { document: false, query: true }, function (doc, next) {
    return __awaiter(this, void 0, void 0, function* () {
        yield course_model_1.CourseModel.updateOne({ _id: doc.course._id }, { $pull: { projects: doc._id } });
        next();
    });
});
//? Al guardar actualizar añadir el proyecto al curso
exports.ProjectSchema.post("save", function (doc, next) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        yield course_model_1.CourseModel.updateOne({ _id: (_a = doc.course) === null || _a === void 0 ? void 0 : _a._id }, { $push: { projects: doc._id } }, { new: true });
        next();
    });
});
//? Actualizamos el projecto en los cursos
exports.ProjectSchema.post("findOneAndUpdate", { document: false, query: true }, function (doc, next) {
    return __awaiter(this, void 0, void 0, function* () {
        //? Eliminamos el proyecto del curso en el que estaba
        yield course_model_1.CourseModel.updateOne({ projects: doc._id }, {
            $pull: { projects: doc._id },
        });
        //? Añadimos al nuevo proyecto
        yield course_model_1.CourseModel.updateOne({ _id: doc.course._id }, { $push: { projects: doc._id } });
        next();
    });
});
exports.ProjectModel = (0, mongoose_1.model)("Project", exports.ProjectSchema);
