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
	ACESS_DENIED: 403,
	INVALID_TOKEN: 401,
};

// Keys at which data is stored in redis
export const REDIS = {
	HOMEPAGE_RESIDENTS: "homepage:residents",
	HOMEPAGE_AMENITIES: "homepage:amenities",
	DASHBOARD_COMPLAINTS: "dashboard:complaints",
	DASHBOARD_AMENITIES: "dashboard:amenities",
};

export const MONTHS_SHORT = [
	"Jan",
	"Feb",
	"Mar",
	"Apr",
	"May",
	"Jun",
	"Jul",
	"Aug",
	"Sep",
	"Oct",
	"Nov",
	"Dec",
];

export const RESPONSE_HEADER_TOKEN = "authorization";
