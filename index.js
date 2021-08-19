import express from 'express';
const app = express();
import setupDb from './startup/db.js';
import requestConditions from './startup/requestConditions.js';
import logger from './startup/logging.js';
import setupCloudinary from './startup/cloudinary.js';
import intializeRoutes from './startup/routes.js';

setupDb();
requestConditions(app);
logger(app);
setupCloudinary();
intializeRoutes(app);

const PORT = process.env.PORT || 5000;

app.listen(
    PORT,
    () => console.log(`Sever running on port: ${PORT}`)
);
