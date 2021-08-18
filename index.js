import express from 'express';
const app = express();
import dbSetup from './startup/db.js';
import requestConditions from './startup/requestConditions.js';
import logger from './startup/logging.js';

import routerInit from "./routes/index.js";


dbSetup();
requestConditions(app);
logger(app);
routerInit(app);


const PORT = process.env.PORT || 5000;

app.listen(
    PORT,
    () => console.log(`Sever running on port: ${PORT}`)
);
