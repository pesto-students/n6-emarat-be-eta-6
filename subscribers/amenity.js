import redisClient from "../config/redis.js";
import { REDIS } from "../lib/constants.js";
import { mostAvailedAmenities } from "../controllers/dashboard.js";

export default async () => {
	const amenities = await mostAvailedAmenities();

	redisClient.set(REDIS.DASHBOARD_AMENITIES, JSON.stringify(amenities));
};
