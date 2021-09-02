import auth from "../routes/auth.js";
import users from "../routes/user.js";
import amenity from "../routes/amenity.js";
import broadcasts from "../routes/broadcasts.js";
import uploadImage from "../routes/uploadImage.js";
import httpError from "../middleware/httpError.js";

export default (app) => {
	app.use("/", auth);
	app.post("/upload", uploadImage);
	app.use("/users", users);
	app.use("/api/amenities", amenity);
    app.use('/broadcasts', broadcasts)

	app.use((req, res, next) => res.status(404).send("Not found"));
	app.use(httpError);
};
