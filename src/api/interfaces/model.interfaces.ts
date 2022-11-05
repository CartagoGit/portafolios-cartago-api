import { Request } from "express";
import { Model } from "mongoose";
//$ Interfaces basicas y generales para los controllers y middleware

//? Creamos una nueva interfaz que hereda de las request y le añadimos la información que queremos pasar por la req a trves del middleware
export interface IRequestModel extends Request {
	dataModel: IDataModel;
}

//? Tipos de modelos
export type TTypeModels = "authors" | "courses" | "projects";

//? Mapeo para que cada datamodel sea de alguno de los tipos posibles
export type IDataModels = {
	[key in TTypeModels]: IDataModel;
};

//? los datos necesarios para pasar por el middleware
export interface IDataModel {
	typeModel: keyof IDataModels;
	nameModel: INameModel;
	Model: Model<any>;
}

//? el texto en español y en ingles a mostrar segun la peticion
export interface INameModel {
	es_singular: string;
	es_plural: string;
	en_singular: string;
	en_plural: string;
}
