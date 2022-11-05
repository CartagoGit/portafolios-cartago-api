import { Schema, model } from "mongoose";
import { CourseModel } from "./course.model";
import { DatesSchema } from "./schemas/dates.schema";

export const ProjectSchema = new Schema({
	title: { type: String, required: true },
	description: { type: String, required: true },
	githubCartago: { type: String },
	githubCourse: { type: String },
	useTo: {
		type: String,
		required: true,
		enum: ["Course", "Testing", "Own", "Teach", "Data"],
		//* Proyecto creado para - Cursos, Testear, Propios, Enseñar, Guardar información
	},
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

//? Triggers para realizar efecto cascada en los dependientes
ProjectSchema.post(
	"findOneAndDelete",
	{ document: false, query: true },
	async function (doc, next) {
		await CourseModel.updateOne(
			{ _id: doc.course._id },
			{ $pull: { projects: doc._id } }
		);
		next();
	}
);

ProjectSchema.post("save", async function (doc, next) {
	const course = await CourseModel.findOneAndUpdate(
		{ _id: doc.course?._id },
		{ $push: { projects: doc._id } },
		{ new: true }
	);
	doc.update({}, { author: course?.author });
	next();
});

//? Actualizamos el projecto en los cursos
ProjectSchema.post(
	"findOneAndUpdate",
	{ document: false, query: true },
	async function (doc, next) {
		//? Eliminamos el proyecto del curso en el que estaba
		await CourseModel.updateOne(
			{ projects: doc._id },
			{
				$pull: { projects: doc._id },
			}
		);
		//? Añadimos al nuevo proyecto
		await CourseModel.updateOne(
			{ _id: doc.course._id },
			{ $push: { projects: doc._id } }
		);
		next();
	}
);

export const ProjectModel = model("Project", ProjectSchema);
