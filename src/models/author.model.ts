import { model, Schema } from "mongoose";
import { DatesSchema } from "./schemas/dates.schema";
import { LinksSchema } from "./schemas/links.schema";
import { TechsSchema } from "./schemas/techs.schema";

export const AuthorSchema = new Schema({
	name: { type: String, required: true },
	image: { type: String },
	links: { type: LinksSchema },
	techs: { type: TechsSchema },
	dates: { type: DatesSchema, required: true },
	courses: [
		{
			type: Schema.Types.ObjectId,
			ref: "Course",
			unique: true,
			default: [],
			autopopulate: true,
		},
	],
});
AuthorSchema.plugin(require("mongoose-autopopulate"));

export const AuthorModel = model("Author", AuthorSchema);
