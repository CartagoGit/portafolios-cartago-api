import { Schema } from "mongoose";

const TFrameworkFront = [
	"Angular",
	"ReactJs",
	"VueJs",
	"NextJs",
	"Unity",
	"iOnic",
	"ReactNative",
	"Xamarin",
	"JQuery",
];
const TLanguageFront = ["JavaScript", "TypeScript", "C#"];

const ELanguageBack = [
	"JavaScript",
	"TypeScript",
	"Php",
	"Python",
	"Solidity",
	"Java",
];

const TTag = ["HTML"];
const TStyle = ["Css", "Scss", "Sass", "Less", "Bootstrap", "Tailwind"];
const ELib = [
	"ExpressJs",
	"Mongoose",
	"OpenZeppelin",
	"MomentJs",
	"ViteJs",
	"NxJs",
	"RxJs",
	"NgRx",
	"Redux",
];

const EMethodology = [
	"Scrum",
	"Kanban",
	"Extreme Programming - XP",
	"Modelo vista controlador (MVC)",
];

const EFrameworkBack = ["Laravel", "Symfony", "Spring", "NodeJs"];

//? Creamos los esquemas de cada tipo de programacion
const FrontendSchema = new Schema(
	{
		framework: { type: [String], enum: TFrameworkFront, default: undefined },
		language: { type: [String], enum: TLanguageFront, default: undefined },
		libreries: { type: [String], enum: ELib, default: undefined },
		methodology: { type: [String], enum: EMethodology, default: undefined },
		tag: { type: [String], enum: TTag, default: undefined },
		style: { type: [String], enum: TStyle, default: undefined },
	},
	{ _id: false }
);

const BackendSchema = new Schema(
	{
		framework: { type: [String], enum: EFrameworkBack, default: undefined },
		language: { type: [String], enum: ELanguageBack, default: undefined },
		libreries: { type: [String], enum: ELib, default: undefined },
		methodology: { type: [String], enum: EMethodology, default: undefined },
	},
	{ _id: false }
);

export const TechsSchema = new Schema(
	{
		frontend: FrontendSchema,
		backend: BackendSchema,
	},
	{ _id: false }
);
