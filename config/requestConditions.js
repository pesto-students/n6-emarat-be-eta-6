import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import morganMiddleware from "../middleware/morganMiddleware.js";

export default (app) => {
	const appKey = process.env.APP_KEY || "6PJo7InifKDuxtjudSMptrE~FI0C";

	app.use(
		express.json({
			limit: "30mb", // maximum request body size
		}),
		express.urlencoded({
			limit: "30mb", // maximum request body size
			extended: true, // qs library (when true). The “extended” syntax allows for rich objects and arrays to be encoded into the URL-encoded format, allowing for a JSON-like experience with URL-encoded.
		}),
		express.static("public"), //This is a built-in middleware function in Express. It serves static files and is based on serve-static. The root argument specifies the root directory from which to serve static assets

		cors({ exposedHeaders: "Authorization" }), // CORS is a node.js package for providing a Connect/Express middleware that can be used to enable CORS with various options.

		cookieParser(appKey),

		morganMiddleware //HTTP request logger middleware for node.js
	);
};
