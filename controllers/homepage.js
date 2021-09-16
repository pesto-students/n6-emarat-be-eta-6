import Amenity from "../models/amenity.js";
import Complaint from "../models/complaint.js";
import User from "../models/user.js";
import { getOrSetCache } from "../helpers/redis.js";
import { getResponseErrorFormat, getResponseFormat } from "../lib/utils.js";
import { complaintsDashboardData } from "./dashboard.js";
import { REDIS } from "../lib/constants.js";

export const show = async (req, res) => {
	try {
		const complaintsData = await getOrSetCache(
			REDIS.DASHBOARD_COMPLAINTS,
			complaintsDashboardData
		);

		const residentsCount =
			(await getOrSetCache(
				REDIS.HOMEPAGE_RESIDENTS,
				getResidentsCount
			)) || 0;
		const amenitiesCount =
			(await await getOrSetCache(
				REDIS.HOMEPAGE_AMENITIES,
				getAmenitiesCount
			)) || 0;

		const stats = {
			residentsCount,
			complaintsResolved: complaintsData?.count?.resolved || 0,
			amenitiesCount,
		};

		return res.send(getResponseFormat(stats));
	} catch (error) {
		return res.status(403).send(getResponseErrorFormat(error));
	}
};

export const getResidentsCount = async () => {
	try {
		return await User.countDocuments({
			isAdmin: false,
		});
	} catch (error) {
		throw new Error(error);
	}
};

export const getAmenitiesCount = async () => {
	try {
		return await Amenity.countDocuments({});
	} catch (error) {
		throw new Error(error);
	}
};
