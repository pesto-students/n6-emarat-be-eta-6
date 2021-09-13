export const searchArrForObjVal = (key, value, array) =>
	array.find((currentEl) => currentEl[key] === value);
