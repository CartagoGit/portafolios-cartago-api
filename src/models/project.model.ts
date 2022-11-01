import { Schema, model } from "mongoose";
import { DatesSchema } from "./schemas/dates.schema";

export const ProjectSchema = new Schema({
	title: { type: String, required: true },
	description: { type: String, required: true },
	githubCartago: { type: String },
	githubCourse: { type: String },
	course: {
		type: Schema.Types.ObjectId,
		ref: "Course",
		autopopulate: true,
	},
	author: {
		type: Schema.Types.ObjectId,
		ref: "Author",
		autopopulate: true,
	},
	dates: { type: DatesSchema, required: true },
});
ProjectSchema.plugin(require("mongoose-autopopulate"));

export const ProjectModel = model("Project", ProjectSchema);
