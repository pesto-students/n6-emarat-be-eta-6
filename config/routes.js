import auth from "../routes/auth.js";
// import users from '../routes/users.js';
// import amenities from '../routes/amenities.js';
import uploadImage from "../routes/uploadImage.js";
import httpError from "../middleware/httpError.js";

export default (app) => {
	app.use("/", auth);
	app.post("/upload", uploadImage);
	// app.use('/api/users', users);
	// app.use('/api/amenities', amenities);

	app.use((req, res, next) => res.status(404).send("Not found"));

	app.use(httpError);
};
