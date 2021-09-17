import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import morganMiddleware from "../middleware/morganMiddleware.js";

export default (app) => {
	const appKey = process.env.APP_KEY || "6PJo7InifKDuxtjudSMptrE~FI0C";

	app.use(
		express.json({
			limit: "30mb",
		}),
		express.urlencoded({
			limit: "30mb",
			extended: true,
		}),
		express.static("public"),

		cors({ exposedHeaders: "Authorization", origin: true }),

		cookieParser(appKey),

		helmet(),

		morganMiddleware //HTTP request logger middleware for node.js
	);
};
