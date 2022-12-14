/**
 * Comprueba si el argumento es un objeto.
 * @param item
 * @returns {boolean}
 */
export function isObject(item: any): boolean {
	return (
		item && typeof item === "object" && !Array.isArray(item) && item !== null
	);
}

/**
 * Deep merge de dos objetos.
 * @param target
 * @param source
 * @returns {object}
 */
export function mergeDeep(target: any, source: any): object {
	if (isObject(target) && isObject(source)) {
		for (const key in source) {
			if (isObject(source[key])) {
				if (!target[key]) Object.assign(target, { [key]: {} });
				mergeDeep(target[key], source[key]);
			} else {
				Object.assign(target, { [key]: source[key] });
			}
		}
	}
	return target;
}
