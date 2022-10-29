import { model, Schema } from "mongoose";

export interface Author {
	id: string | number;
	name: string;
    image?: string;
	links?: {
		personal?: string;
		udemy?: string;
		twitter?: string;
		linkedin?: string;
		youtube?: string;
		instagram?: string;
		tiktok?: string;
		others?: string[];
	};
}

const AuthorSchema = new Schema({
	name: { type: String, required: true },
    image: { type: String },
	links: {
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
