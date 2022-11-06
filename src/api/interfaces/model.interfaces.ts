import { Request } from "express";
import { Model } from "mongoose";

//$ Interfaces basicas y generales para los controllers y middleware

/**
 * ? Interfaz extendida de Request de express para añadir nuevos datos a traves del middleware
 */
export interface IRequestModel extends Request {
	dataModel: IDataModel;
}

//
/** 
 * ? Tipos de modelos
 */
export type TTypeModels = "authors" | "courses" | "projects";

/**
 * ? Mapeo para que cada datamodel sea de alguno de los tipos posibles
 */

export type IDataModels = {
	[key in TTypeModels]: IDataModel;
};

/**
 * ? Interface con los datos que se pasan por la request a traves del middleware
 */
export interface IDataModel {
	typeModel: keyof IDataModels;
	nameModel: INameModel;
	Model: Model<any>;
}
/**
 * ? Texto segun el idioma
 */
export interface INameModel {
	es_singular: string;
	es_plural: string;
	en_singular: string;
	en_plural: string;
}
