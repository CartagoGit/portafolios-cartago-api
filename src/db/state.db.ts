import mongoose from "mongoose";

//? Archivo para guardar la config de la base de datos y usarla

let db: mongoose.Connection;

export const setDb = (newDb: mongoose.Connection) => {
	db = newDb;
};

export const getDb = () => {
	return db;
};
