import redisClient from "../config/redis.js";
import { REDIS } from "../lib/constants.js";
import { complaintsDashboardData } from "../controllers/dashboard.js";

export default async () => {
	const complaints = await complaintsDashboardData();

	redisClient.set(REDIS.DASHBOARD_COMPLAINTS, JSON.stringify(complaints));
};
