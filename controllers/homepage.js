import Amenity from "../models/amenity.js";
import Complaint from "../models/complaint.js";
import User from "../models/user.js";
import { getOrSetCache } from "../helpers/redis.js";
import { getResponseErrorFormat, getResponseFormat } from "../lib/utils.js";
import { complaintsDashboardData } from "./dashboard.js";
import { REDIS } from "../lib/constants.js";

export const show = async (req, res) => {
	try {
		const complaintsC = await getOrSetCache(
			REDIS.HOMEPAGE_COMPLAINTS,
			complaintsDashboardData
		);
		const residentsC = await getOrSetCache(
			REDIS.HOMEPAGE_RESIDENTS,
			residentsCount
		);
		const amenitiesC = await await getOrSetCache(
			REDIS.HOMEPAGE_AMENITIES,
			amenitiesCount
		);

		const statsInit = {
			residentsCount: complaintsC?.count?.resolved || 0,
			complaintsResolved: residentsC || 0,
			amenitiesCount: amenitiesC || 0,
		};

		return res.send(getResponseFormat(statsInit));
	} catch (error) {
		return res.status(403).send(getResponseErrorFormat(error));
	}
};

const residentsCount = async () => {
	try {
		return await User.countDocuments({
			isAdmin: false,
		});
	} catch (error) {
		throw new Error(error);
	}
};

const amenitiesCount = async () => {
	try {
		return await Amenity.countDocuments({});
	} catch (error) {
		throw new Error(error);
	}
};
