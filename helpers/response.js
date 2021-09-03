import { getResponseErrorFormat } from "../lib/utils.js";

export const sendError = (res, error, code = 409) => {
	if (!res.headersSent)
		res.status(code).json(getResponseErrorFormat(error.message));
};
