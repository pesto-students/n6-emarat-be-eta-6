import dayjs from "dayjs";
import Complaint from "../models/complaint.js";
import Amenity from "../models/amenity.js";
import User from "../models/user.js";
import { sendError } from "../helpers/response.js";
import { getResponseFormat } from "../lib/utils.js";
import redis from "../config/redis.js";
import { getResponseErrorFormat } from "../lib/utils.js";

export const index = async (req, res) => {
	try {
		const complaintsCount = await countComplaintsByStatus();
		const complaintsCountByMonth = await countComplaintsStatusByMonth();

		if (complaintsCount.error) {
			return res
				.status(401)
				.send(getResponseErrorFormat(complaintsCount.error));
		}

		return res.status(200).json(getResponseFormat(complaintsCount.data));
	} catch (error) {
		return sendError(res, error);
	}
};

export const countComplaintsByStatus = async () => {
	let error = false;
	let data = {
		raised: 0,
		progress: 0,
		resolved: 0,
		rejected: 0,
	};

	try {
		const agg = await Complaint.aggregate([
			{ $group: { _id: "$status", count: { $sum: 1 } } },
		]);

		// Putting moongoose agg data into our data variable declared above
		for (let key in data) {
			const complaint = agg.find((currentValue) => {
				return currentValue._id === key;
			});
			if (complaint) data[key] = complaint.count;
		}
	} catch (error) {
	} finally {
		error = error;
		return { error, data };
	}
};

export const countComplaintsStatusByMonth = async () => {
	let startOfMonth = dayjs().startOf("day");
	let endOfMonth = dayjs().endOf("month");
	let result = [];

	// Generate for last 12 months
	for (let i = 0; i <= 12; i++) {
		startOfMonth = startOfMonth.subtract(1, "month");
		endOfMonth = endOfMonth.subtract(1, "month");

		console.log(startOfMonth.toISOString());
		console.log(endOfMonth.toISOString());

		// const agg = await Complaint.find({
		// 	createdAt: {
		// 		$gte: startOfMonth,
		// 		$lt: endOfMonth,
		// 	},
		// });

		// result.push({
		// 	month: 1,
		// 	year: 2021,
		// 	raised: 1,
		// 	resolved: 1,
		// 	progress: 1,
		// 	rejected: 1,
		// });

		// const agg = await Complaint.aggregate([
		// 	{ $group: {_id: "$status", count: { $sum: 1 } } },
		// ]);
	}
};

// count: {
// 	raised: 1,
// 	resolved: 1,
// 	progress: 1,
// 	rejected: 1,
// },
// byPeriod: [
// 	{
// 		month: 1;
// 		year: 2021;
// 		raised: 1,
// 		resolved: 1,
// 		progress: 1,
// 		rejected: 1,
// 	}
// ]
