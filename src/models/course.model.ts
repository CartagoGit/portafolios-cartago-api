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
		autopopulate: true,
	},
	projects: [
		{
			type: Schema.Types.ObjectId,
			ref: "Project",
			unique: true,
			required: true,
			default: [],
			autopopulate: true,
		},
	],

	dates: { type: DatesSchema, required: true },
});
CourseSchema.plugin(require("mongoose-autopopulate"));

export const CourseModel = model("Course", CourseSchema);
