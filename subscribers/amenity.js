import redisClient from "../config/redis.js";
import { REDIS } from "../lib/constants.js";
import { mostAvailedAmenities } from "../controllers/dashboard.js";
import { getAmenitiesCount } from "../controllers/homepage.js";

export default async () => {
	// Most availed amenities dashboard
	const amenities = await mostAvailedAmenities();
	redisClient.set(REDIS.DASHBOARD_AMENITIES, JSON.stringify(amenities));

	// Amenities count for homepage
	const count = (await getAmenitiesCount()) || 0;
	redisClient.set(REDIS.HOMEPAGE_AMENITIES, JSON.stringify(count));
};
