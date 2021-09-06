import dayjs from "dayjs";
import Complaint from "../models/complaint.js";
import User from "../models/user.js";
import { sendError } from "../helpers/response.js";
import { getResponseFormat } from "../lib/utils.js";
import { searchArrForObjVal } from "../helpers/array.js";
import { getOrSetCache } from "../helpers/redis.js";
import Logger from "../lib/logging.js";
import { MONTHS_SHORT, REDIS } from "../lib/constants.js";

export const show = async (req, res) => {
	try {
		const complaints = await getOrSetCache(
			REDIS.DASHBOARD_COMPLAINTS,
			complaintsDashboardData
		);

		const amenities = await getOrSetCache(
			REDIS.DASHBOARD_AMENITIES,
			mostAvailedAmenities
		);

		return res
			.status(200)
			.json(getResponseFormat({ complaints, amenities }));
	} catch (error) {
		Logger.error(error);
		return sendError(res, error);
	}
};

export const complaintsDashboardData = async () => {
	const complaintsCount = await countComplaintsByStatus();
	const complaintsCountByMonth = await countComplaintsStatusByMonth(12);

	return {
		count: complaintsCount,
		byMonth: complaintsCountByMonth,
	};
};

export const mostAvailedAmenities = async () => {
	try {
		return await User.aggregate()
			// Deconstruct amenities array field
			.unwind("$amenities")
			// Group by amenities count
			.group({
				_id: "$amenities",
				count: { $sum: 1 },
			})
			// Sort by count
			.sort({ count: -1 })
			// Join with amenity collection
			.lookup({
				from: "amenities",
				localField: "_id",
				foreignField: "_id",
				as: "amenity",
			})
			// Return only specified fields
			.project({
				name: { $arrayElemAt: ["$amenity.name", 0] }, // return single value, amenity name
				count: 1,
			})
			// Filters to pass only the documents where the value of the field is not equal null.
			.match({ name: { $ne: null } });
	} catch (error) {
		throw new Error(error);
	}
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

		const month = startOfMonth.month();
		result.push({
			month,
			monthName: MONTHS_SHORT[month],
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

		// If to or form date exists then add to where condition
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
			// Group data based on sum of status field
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
