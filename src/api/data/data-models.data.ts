import { AuthorModel } from "../../models/author.model";
import { CourseModel } from "../../models/course.model";
import { ProjectModel } from "../../models/project.model";
import { IDataModels } from "../interfaces/model.interfaces";

/**
 * ? Datos para enviar a traves de la request por un middleware para poder realizar las respuestas programáticas
 */
export const dataModels: IDataModels = {
	authors: {
		nameModel: {
			es_singular: "autor",
			es_plural: "autores",
			en_singular: "author",
			en_plural: "authors",
		},
		Model: AuthorModel,
		typeModel: 'authors'
	},
	courses: {
		nameModel: {
			es_singular: "curso",
			es_plural: "cursos",
			en_singular: "course",
			en_plural: "courses",
		},
		Model: CourseModel,
		typeModel: 'courses'
	},
	projects: {
		nameModel: {
			es_singular: "proyecto",
			es_plural: "proyectos",
			en_singular: "project",
			en_plural: "projects",
		},
		Model: ProjectModel,
		typeModel: "projects"
	},
};
