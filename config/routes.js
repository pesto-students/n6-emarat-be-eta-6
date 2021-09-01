import auth from "../routes/auth.js";
import users from "../routes/user.js";
import amenity from "../routes/amenity.js";
import broadcasts from "../routes/broadcasts.js";
import uploadImage from "../routes/uploadImage.js";
import payments from "../routes/payments.js";
import httpError from "../middleware/httpError.js";
import authMiddleware from '../middleware/auth.js';

export default (app) => {
	app.use("/", auth);
	app.post("/upload", uploadImage);
	app.use("/users", [authMiddleware], users);
	app.use("/api/amenities", [authMiddleware], amenity);
    app.use('/broadcasts', [authMiddleware], broadcasts);
    app.use('/payments', payments );

	app.use((req, res, next) => res.status(404).send("Not found"));
	app.use(httpError);
};
