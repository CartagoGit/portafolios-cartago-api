import { model, Schema } from "mongoose";

const TFrameworkFront = [
	"Angular",
	"ReactJs",
	"VueJs",
	"NextJs",
	"Unity",
	"iOnic",
	"ReactNative",
	"Xamarin",
];
const TLanguageFront = ["JavaScript", "TypeScript", "C#"];

const TLanguageBack = [
	"JavaScript",
	"TypeScript",
	"Php",
	"Python",
	"Solidity",
	"Java",
];

const TTag = ["HTML"];
const TStyle = ["Css", "Scss", "Sass", "Less", "Bootstrap", "Tailwind"];
const TLib = [
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

const TMethodology = [
	"Scrum",
	"Kanban",
	"Extreme Programming - XP",
	"Modelo vista controlador (MVC)",
];

const TFrameworkBack = ["Laravel", "Symfony", "Spring", "NodeJs"];
const FrontendSchema = new Schema({
	framework: { type: String, enum: TFrameworkFront },
	language: { type: String, enum: TLanguageFront },
	libreries: { type: String, enum: TLib },
	methodology: { type: String, enum: TMethodology },
	tag: { type: String, enum: TTag },
	style: { type: String, enum: TStyle },
});

const BackendSchema = new Schema({
	framework: { type: String, enum: TFrameworkBack },
	language: { type: String, enum: TLanguageBack },
	libreries: { type: String, enum: TLib },
	methodology: { type: String, enum: TMethodology },
});

export const TechsSchema = new Schema({
	frontend: FrontendSchema,
	backend: BackendSchema,
});
export const TechsModel = model("Techs", TechsSchema);

