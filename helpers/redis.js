import redisClient from "../config/redis.js";

export const getOrSetCache = async (key, cb) => {
	try {
		const data = await redisClient.get(key);

		if (data) {
			return JSON.parse(data);
		} else {
			const freshData = await cb();
			redisClient.set(key, JSON.stringify(freshData));
			return freshData;
		}
	} catch (error) {
		throw new Error(error);
	}
};
