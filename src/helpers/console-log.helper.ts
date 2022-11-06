/**
 * ? Código de colores para consola en servidor
 */
export const colors = {
	reset: "\x1b[0m",
	bright: "\x1b[1m",
	dim: "\x1b[2m",
	underscore: "\x1b[4m",
	blink: "\x1b[5m",
	reverse: "\x1b[7m",
	hidden: "\x1b[8m",

	fg: {
		black: "\x1b[30m",
		red: "\x1b[31m",
		green: "\x1b[32m",
		yellow: "\x1b[33m",
		blue: "\x1b[34m",
		magenta: "\x1b[35m",
		cyan: "\x1b[36m",
		white: "\x1b[37m",
		crimson: "\x1b[38m", // Scarlet
	},
	bg: {
		black: "\x1b[40m",
		red: "\x1b[41m",
		green: "\x1b[42m",
		yellow: "\x1b[43m",
		blue: "\x1b[44m",
		magenta: "\x1b[45m",
		cyan: "\x1b[46m",
		white: "\x1b[47m",
		crimson: "\x1b[48m",
	},
};

/**
 * ? Texto en ASCII de Cartago
 */
export const logoAscii: Readonly<string> = `
.oooooo.                          .                                  
d8P'   Y8b                       .o8                                  
888           .oooo.   oooo d8b .o888oo  .oooo.    .oooooooo  .ooooo.  
888           P  )88b   888""8P   888    P  )88b  888'  88b  d88'  88b 
888           .oP"888   888       888    .oP"888  888   888  888   888 
 88b    ooo  d8(  888   888       888 . d8(  888   88bod8P'  888   888 
 Y8bood8P'   Y888""8o d888b      "888"  Y888""8o  8oooooo.   Y8bod8P' 
                                                 d"     YD            
                                                 "Y88888P'      
`;

/**
 * ? Texto preset al inicial el servidor
 */
export const messageInitServidor = (config: any): string => {
	return `
	Server in mode ${colors.fg.cyan + config.NODE_ENV + colors.reset}
	Running on ${colors.fg.magenta + config.HOST}:${
		colors.fg.red + config.PORT + colors.reset
	} 
	from ${colors.fg.yellow + config.FROM + colors.reset}`;
};
