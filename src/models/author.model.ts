import { model, Schema } from "mongoose";

const AuthorSchema = new Schema({
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
});

export const AuthorModel = model("Author", AuthorSchema);
