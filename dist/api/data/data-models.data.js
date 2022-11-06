"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dataModels = void 0;
const author_model_1 = require("../../models/author.model");
const course_model_1 = require("../../models/course.model");
const project_model_1 = require("../../models/project.model");
/**
 * ? Datos para enviar a traves de la request por un middleware para poder realizar las respuestas programáticas
 */
exports.dataModels = {
    authors: {
        nameModel: {
            es_singular: "autor",
            es_plural: "autores",
            en_singular: "author",
            en_plural: "authors",
        },
        Model: author_model_1.AuthorModel,
        typeModel: 'authors'
    },
    courses: {
        nameModel: {
            es_singular: "curso",
            es_plural: "cursos",
            en_singular: "course",
            en_plural: "courses",
        },
        Model: course_model_1.CourseModel,
        typeModel: 'courses'
    },
    projects: {
        nameModel: {
            es_singular: "proyecto",
            es_plural: "proyectos",
            en_singular: "project",
            en_plural: "projects",
        },
        Model: project_model_1.ProjectModel,
        typeModel: "projects"
    },
};
