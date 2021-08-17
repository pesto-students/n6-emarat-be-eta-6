import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import connectDB from "./config/db.js";
import routerInit from "./routes/index.js";

// Add environment variables
dotenv.config({ path: './config/.env' });

const appKey = process.env.APP_KEY || "6PJo7InifKDuxtjudSMptrE~FI0C";

const dbConn = connectDB();

// Express Init
const app = express();

// Middlewares
app.use(
	express.json({
		limit: "30mb" // maximum request body size
	}),
	express.urlencoded({
		limit: '30mb', // maximum request body size
		extended: true // qs library (when true). The “extended” syntax allows for rich objects and arrays to be encoded into the URL-encoded format, allowing for a JSON-like experience with URL-encoded.
	}),
	express.static('public'), //This is a built-in middleware function in Express. It serves static files and is based on serve-static. The root argument specifies the root directory from which to serve static assets

	cors(), // CORS is a node.js package for providing a Connect/Express middleware that can be used to enable CORS with various options.

	cookieParser(appKey),
);

// Logging
if (process.env.NODE_ENV === 'development')
{
	app.use(require('morgan')('dev'))
}

// Routes
routerInit(app);


const PORT = process.env.PORT || 5000;

app.listen(
	PORT,
	() => console.log(`Sever running on port: ${PORT}`)
);
