import dotenv from "dotenv";
import { colors } from "../../helpers/console-log.helper";

//? Si estamos en desarrollo añadimos las variables de entorno al process.env con dotenv
if (process.env.NODE_ENV === "development") {
	const dotEnvResult = dotenv.config({
		path: __dirname + "/.env",
		// +
		// (process.env.NODE_ENV === "production" ? ".prod" : ""),
	});
	if (dotEnvResult.error) {
		console.log(
			colors.fg.red +
				"Got an error looking for the environment variables" +
				colors.reset
		);
		console.log(colors.fg.yellow + dotEnvResult.error + colors.reset);
		throw dotEnvResult.error;
	}
}

//? Si no se encuentran las variables de entorno usa las variables de testing
/**
 * ? Procedencia de las variables de entorno
 */
export const FROM: string = process.env.FROM || "auxiliar testing variables";

/**
 * ? Tipo de desarrollo (development | production)
 */
export const NODE_ENV: string = process.env.NODE_ENV || "development";

/**
 * ? Lugar de host del servidor
 */
export const HOST: string = process.env.HOST || "localhost";

/**
 * ? Puerto del servidor
 */
export const PORT: number | string = process.env.PORT || 5000;

/**
 * ? Dirección de conexion con la base de datos Mongo
 */
export const MONGODB_CONNECT: string | undefined = process.env.MONGODB_CONNECT;

/**
 * Objeto config que exporta todas las variables de entorno
 */
export default {
	FROM,
	NODE_ENV,
	HOST,
	PORT,
	MONGODB_CONNECT,
};
