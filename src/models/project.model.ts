import { Schema, model } from "mongoose";

export const ProjectSchema = new Schema({
	description: { type: String },
});

export const ProjectModel = model("Project", ProjectSchema);
