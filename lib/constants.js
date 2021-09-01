// Define your severity levels.
// With them, You can create log files,
// see or hide levels based on the running ENV.
export const LOG_LEVELS = {
	error: 0,
	warn: 1,
	info: 2,
	http: 3,
	debug: 4,
};

// Define different colors for each level.
// Colors make the log message more visible,
// adding the ability to focus or ignore messages.
export const LOG_LEVEL_COLORS = {
	error: "red",
	warn: "yellow",
	info: "green",
	http: "magenta",
	debug: "white",
};

export const CUSTOM_API_CODES = {
	AUTH_TOKEN: 3001,
    ACESS_DENIED: 403,
    INVALID_TOKEN: 401,
};

export const OTP_EXPIRE_TIME_IN_MINUTES = 5;
export const TEST_MASTER_OTP = "123456";
