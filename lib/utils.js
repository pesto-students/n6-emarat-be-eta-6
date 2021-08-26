import Logger from "./logging.js";

export const isDevelopmentEnv = () => {
	const env = process.env.NODE_ENV || "development";
	return env === "development";
};

export const getResponseErrorFormat = (
	msg = "Something Went Wrong with server",
	errCode = "500"
) => ({
	meta: {
		success: false,
		msg,
		code: errCode,
	},
});

export const getResponseFormat = (data, msg = '', code = '', ) => ({
	meta: {
		success: true,
		code,
		msg,
	},
	data,
});
