import redisClient from "../config/redis.js";
import { REDIS } from "../lib/constants.js";
import { getResidentsCount } from "../controllers/homepage.js";

export default async () => {
	// Residents count for homepage
	const count = (await getResidentsCount()) || 0;
	redisClient.set(REDIS.HOMEPAGE_RESIDENTS, count);
};
