import { cacheComplaints } from "../subscribers/complaint.js";

export default (app) => {
	app.on("complaints:cache", cacheComplaints);
};
