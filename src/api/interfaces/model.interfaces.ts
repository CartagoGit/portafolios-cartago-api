import { Request } from "express";
import { Model } from "mongoose";
//$ Interfaces basicas y generales para los controllers y middleware

//? Creamos una nueva interfaz que hereda de las request y le añadimos la información que queremos pasar por la req
export interface IRequestModel extends Request {
	dataModel: IDataModel;
}
export interface IDataModel {
	nameModel: INameModel;
	Model: Model<any>;
}

export interface INameModel {
	es_singular: string;
	es_plural: string;
	en_singular: string;
	en_plural: string;
}

export interface IDataModels {
	authors: IDataModel;
	courses: IDataModel;
	projects: IDataModel;
}
