import { Schema, model } from "mongoose";

import { DatesSchema } from "./schemas/dates.schema";

export const CourseSchema = new Schema({
	title: { type: String, required: true },
	subtitle: { type: String, required: true },
	link: { type: String, required: true },
	description: { type: String },
	githubCartago: { type: String },
	githubCourse: { type: String },
	linkCertificatePdf: { type: String },

	author: {
		type: Schema.Types.ObjectId,
		ref: "Author",
		required: true,
	},
	projects: [
		{
			type: Schema.Types.ObjectId,
			ref: "Project",
			unique: true,
			required: true,
			default: [],
		},
	],

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
