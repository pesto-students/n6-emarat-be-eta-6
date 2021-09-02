import auth from "../routes/auth.js";
import users from "../routes/user.js";
import amenity from "../routes/amenity.js";
import complaint from "../routes/complaint.js";
import broadcasts from "../routes/broadcasts.js";
import dashboard from "../routes/dashboard.js";
import uploadImage from "../routes/uploadImage.js";
import httpError from "../middleware/httpError.js";

export default (app) => {
	app.use("/", auth);
	app.post("/upload", uploadImage);

	app.use("/api/users", users);
	app.use("/api/amenities", amenity);
	app.use("/api/complaints", complaint);
	app.use("/api/broadcasts", broadcasts);
	app.use("/api/dashboard", dashboard);

	app.use((req, res, next) => res.status(404).send("Not found"));
	app.use(httpError);
};
