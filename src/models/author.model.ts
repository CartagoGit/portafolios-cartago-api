import { model, Schema } from "mongoose";
import { TechsModel, TechsSchema } from "./techs.models";

export const AuthorSchema = new Schema({
	name: { type: String, required: true },
	image: { type: String },
	links: {
		type: Object,
		personal: { type: String },
		udemy: { type: String },
		twitter: { type: String },
		linkedin: { type: String },
		youtube: { type: String },
		instagram: { type: String },
		tiktok: { type: String },
		others: { type: [String] },
	},
	techs: { type: TechsSchema },
});

export const AuthorModel = model("Author", AuthorSchema);
