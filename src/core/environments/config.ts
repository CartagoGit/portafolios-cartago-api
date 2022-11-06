import dotenv from "dotenv";
import { colors } from "../../helpers/console-log.helper";

const dotEnvResult = dotenv.config({
	path: __dirname + "/.env",
	// +
	// (process.env.NODE_ENV === "production" ? ".prod" : ""),
});
if (dotEnvResult.error) {
	console.log(
		colors.fg.red +
			"Get an error looking for the environment variables" +
			colors.reset
	);
	// throw dotEnvResult.error;
	console.log(colors.fg.yellow + dotEnvResult.error + colors.reset);
}

//? Si no se encuentran las variables de entorno usa las variables de testing
export = {
	FROM: process.env.FROM || "auxiliar testing variables",
	NODE_ENV: process.env.NODE_ENV || "development",
	HOST: process.env.HOST || "localhost",
	PORT: process.env.PORT || 5000,
	MONGODB_CONNECT: process.env.MONGODB_CONNECT,
};
