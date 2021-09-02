import express from "express";
import setupDb from "./config/db.js";
import requestConditions from "./config/requestConditions.js";
import setupCloudinary from "./config/cloudinary.js";
import intializeSubscribers from "./config/subscribers.js";
import intializeRoutes from "./config/routes.js";
import { initFirebaseAuth } from "./config/firebaseAuth.js";
import initRedis from "./config/redis.js";
import Logger from "./lib/logging.js";

const app = express();

initFirebaseAuth();
setupDb();
requestConditions(app);
setupCloudinary();
intializeSubscribers(app);
intializeRoutes(app);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () =>
	Logger.debug(`Server is up and running @ http://localhost:${PORT}`)
);
