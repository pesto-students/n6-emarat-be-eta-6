import cacheComplaints from "../subscribers/complaint.js";
import cacheAmenities from "../subscribers/amenity.js";

export default (app) => {
	app.on("complaints:cache", cacheComplaints);
	app.on("amenities:cache", cacheAmenities);
};
