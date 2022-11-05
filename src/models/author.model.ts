import { model, Schema } from "mongoose";
import { CourseModel } from "./course.model";
import { ProjectModel } from "./project.model";
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
		},
	],
});
AuthorSchema.plugin(require("mongoose-autopopulate"));


//? Triggers para realizar efecto cascada en los dependientes
AuthorSchema.pre(
	"findOneAndDelete",
	{ document: false, query: true },
	async function (next) {
		const doc = await this.model.findOne(this.getFilter());
		await CourseModel.deleteMany({ author: doc._id });
		await ProjectModel.deleteMany({ author: doc._id });
		next();
	}
);

export const AuthorModel = model("Author", AuthorSchema);
