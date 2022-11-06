import mongoose, { ConnectOptions } from "mongoose";
import { from, Observable } from "rxjs";

import config from "../core/environments/config";

/**
 * ? Observable para la conexion con mongoDB
 * @returns {Observable<typeof mongoose>}
 */
export const createMongoConection = (): Observable<typeof mongoose> => {
	console.log("Creating connection to MongoDB");
	return from<Promise<typeof mongoose>>(
		mongoose.connect(config.MONGODB_CONNECT!, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		} as ConnectOptions)
	);
};
