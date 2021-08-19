import express from 'express';
const app = express();
import setupDb from './startup/db.js';
import requestConditions from './startup/requestConditions.js';
import setupCloudinary from './startup/cloudinary.js';
import intializeRoutes from './startup/routes.js';
import firebaseAuth from './startup/firebaseAuth.js';
import Logger from './lib/logging.js';
// import { createToken } from './lib/utils.js';

firebaseAuth();
// createToken({uid: '9898989977', additionalClaims: {isAdmin: true}});
setupDb();
requestConditions(app);
setupCloudinary();
intializeRoutes(app);

const PORT = process.env.PORT || 5000;

app.listen(
    PORT,
    () => Logger.debug(`Server is up and running @ http://localhost:${PORT}`)
);
