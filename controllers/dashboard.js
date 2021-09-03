import dayjs from "dayjs";
import Complaint from "../models/complaint.js";
import Amenity from "../models/amenity.js";
import User from "../models/user.js";
import { sendError } from "../helpers/response.js";
import { getResponseFormat } from "../lib/utils.js";
import { searchArrForObjVal } from "../helpers/array.js";
import { getOrSetCache } from "../helpers/redis.js";
import Logger from "../lib/logging.js";

export const index = async (req, res) => {
	try {
		const complaints = await getOrSetCache(
			"dashboard:complaints",
			complaintsDashboardData
		);

		return res.status(200).json(getResponseFormat(complaints));
	} catch (error) {
		Logger.error(error);
		return sendError(res, error);
	}
};

const complaintsDashboardData = async () => {
	const complaintsCount = await countComplaintsByStatus();
	const complaintsCountByMonth = await countComplaintsStatusByMonth(12);

	return {
		count: complaintsCount,
		byMonth: complaintsCountByMonth,
	};
};

const countComplaintsStatusByMonth = async (numberOfmonths) => {
	let startOfMonth = dayjs().startOf("month");
	let endOfMonth = dayjs().endOf("month");
	let result = [];

	// Generate for last 12 months
	for (let i = 0; i < numberOfmonths; i++) {
		const monthData = await countComplaintsByStatus(
			startOfMonth,
			endOfMonth
		);

		result.push({
			month: startOfMonth.month() + 1,
			year: startOfMonth.year(),
			...monthData,
		});

		startOfMonth = startOfMonth.subtract(1, "month");
		endOfMonth = endOfMonth.subtract(1, "month");
	}

	return result;
};

// fromDate and toDate should be daysjs objects
const countComplaintsByStatus = async (fromDate, toDate) => {
	let data = {
		raised: 0,
		progress: 0,
		resolved: 0,
		rejected: 0,
	};

	try {
		let match = {};

		if (fromDate || toDate) {
			match = {
				createdAt: {
					...(fromDate && { $gte: fromDate.toDate() }),
					...(toDate && { $lt: toDate.toDate() }),
				},
			};
		}

		const agg = await Complaint.aggregate()
			.match(match)
			.group({
				_id: "$status",
				count: { $sum: 1 },
			});

		// Putting moongoose agg data into our data variable declared above
		for (let key in data) {
			const complaint = searchArrForObjVal("_id", key, agg);

			if (complaint) data[key] = complaint.count;
		}

		return data;
	} catch (error) {
		throw new Error(error);
	}
};
