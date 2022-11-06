import { Schema, model } from "mongoose";

import { DatesSchema } from "./schemas/dates.schema";
import { ProjectModel } from "./project.model";
import { AuthorModel } from "./author.model";
import { TechsSchema } from "./schemas/techs.schema";

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
		autopopulate: {maxDepth: 1},
	},
	projects: [
		{
			type: Schema.Types.ObjectId,
			ref: "Project",
			autopopulate: {maxDepth: 1},
		},
	],

	techs: { type: TechsSchema },
	dates: { type: DatesSchema, required: true },
});
CourseSchema.plugin(require("mongoose-autopopulate"));

//? Triggers para realizar efecto cascada en los dependientes
CourseSchema.post(
	"findOneAndDelete",
	{ document: false, query: true },
	async function (doc, next) {
		await ProjectModel.deleteMany({ course: doc._id });
		await AuthorModel.updateOne(
			{ _id: doc.author._id },
			{ $pull: { courses: doc._id } }
		);
		next();
	}
);

//? Al guardar añadir el curso al autor
CourseSchema.post("save", async function (doc, next) {
	await AuthorModel.updateOne(
		{ _id: doc.author._id },
		{ $push: { courses: doc._id } },
		{ new: true }
	);
	next();
});

//? Actualizamos el curso en los autores
CourseSchema.post(
	"findOneAndUpdate",
	{ document: false, query: true },
	async function (doc, next) {
		//? Eliminamos el curso del autor en el que estaba
		await AuthorModel.updateOne(
			{ courses: doc._id },
			{
				$pull: { courses: doc._id },
			}
		);
		//? Añadimos al nuevo autor
		await AuthorModel.updateOne(
			{ _id: doc.author._id },
			{ $push: { courses: doc._id } }
		);
		next();
	}
);

export const CourseModel = model("Course", CourseSchema);
