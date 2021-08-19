import express from 'express';
const app = express();
import setupDb from './startup/db.js';
import requestConditions from './startup/requestConditions.js';
import setupCloudinary from './startup/cloudinary.js';
import routerInit from "./routes/index.js";


setupDb();
requestConditions(app);
setupCloudinary();
routerInit(app);

const PORT = process.env.PORT || 5000;

app.listen(
    PORT,
    () => console.log(`Sever running on port: ${PORT}`)
);
