import express from 'express';
import cors from 'cors';
// import auth from '../routes/auth.js';
import users from '../routes/users.js';
// import amenities from '../routes/amenities.js';
import login from '../routes/loginWithOtp.js';
import uploadImage from '../routes/uploadImage.js';
import httpError from '../middleware/httpError.js';
import morganMiddleware from '../middleware/morganMiddleware.js';

export default app => {
    app.use(
        express.json({limit: "30mb"}), // maximum request body size
        express.urlencoded({ limit: '30mb', extended: true }) // qs library (when true). The “extended” syntax allows for rich objects and arrays to be encoded into the URL-encoded format, allowing for a JSON-like experience with URL-encoded.
    );

    const corsOptions = {
        exposedHeaders: 'Authorization',
    };

    app.use(cors(corsOptions));
    app.use(morganMiddleware)

    app.use('/login', login );

    // app.use('/', auth);
    app.post('/upload', uploadImage);
    app.use('/users', users);
    // app.use('/api/amenities', amenities);

    app.use((req, res, next) => res.status(404).send("Not found"));

    app.use(httpError);
};