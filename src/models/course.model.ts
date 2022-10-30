import { Schema, model } from "mongoose";
import { AuthorSchema } from "./author.model";
import { ProjectSchema } from "./project.model";
import { DatesSchema } from "./schemas/dates.schema";

export const CourseSchema = new Schema({
	title: { type: String, required: true },
	subtitle: { type: String, required: true },
	description: { type: String },
	author: { type: AuthorSchema, required: true },
	link: { type: String, required: true },
	githubCartago: { type: String },
	githubCourse: { type: String },
	linkCertificatePdf: { type: String },
	projects: { type: [ProjectSchema], required: true, default: [] },
	dates: { type: DatesSchema, required: true },
});

export const CourseModel = model("Course", CourseSchema);

// export interface ICourse {
//     _id: string | number;
//     title: string;
//     subtitle: string;
//     description?: string;
//     author?: IAuthor;
//     link: string;
//     github?: string;
//     githubCourse?: string;
//     linkCertificatePdf?: string;
//     projects: IProject[];
//     techs: () => ITechs; // unico // Devolver las techs de los proyectos
//     dates: IDates;
//     states: IStates;
//   }
