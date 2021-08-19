import express from 'express';
const app = express();
import setupDb from './startup/db.js';
import requestConditions from './startup/requestConditions.js';
import setupCloudinary from './startup/cloudinary.js';
import routerInit from "./routes/index.js";
import firebaseAuth from './startup/firebaseAuth.js';
import Logger from './lib/logging.js';
// import { createToken } from './config/utils.js';

firebaseAuth();
// createToken({});
setupDb();
requestConditions(app);
setupCloudinary();
routerInit(app);

const PORT = process.env.PORT || 5000;

app.listen(
    PORT,
    () => Logger.debug(`Server is up and running @ http://localhost:${PORT}`)
);
