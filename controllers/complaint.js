import mongoose from "mongoose";
import Complaint from "../models/complaint.js";
import Amenity from "../models/amenity.js";
import { validateCreate, validateUpdate } from "../requests/complaint.js";
import { sendError } from "../helpers/response.js";
import { findOrFail } from "../helpers/db.js";
import { getResponseFormat } from "../lib/utils.js";
import redis from "../config/redis.js";

export const index = async (req, res) => {
	try {
		let match = {};

		// If is not admin then only show the user's complaints
		if (!req.authUser.isAdmin) {
			match = {
				userId: new mongoose.Types.ObjectId(req.authUser.id),
			};
		}

		const complaints = await Complaint.aggregate()
			.match(match)
			.lookup({
				from: "amenities",
				localField: "amenityId",
				foreignField: "_id",
				as: "amenity",
			})
			.lookup({
				from: "users",
				localField: "userId",
				foreignField: "_id",
				as: "user",
			})
			.project({
				status: 1,
				description: 1,
				createdAt: 1,
				comment: 1,
				userName: {
					$concat: [
						{ $arrayElemAt: ["$user.firstName", 0] },
						" ",
						{ $arrayElemAt: ["$user.lastName", 0] },
					],
				},
				userPhone: { $arrayElemAt: ["$user.phone", 0] },
				userFlat: { $arrayElemAt: ["$user.flat", 0] },
				amenityName: { $arrayElemAt: ["$amenity.name", 0] },
				amenityFee: { $arrayElemAt: ["$amenity.fee", 0] },
				amenityIcon: { $arrayElemAt: ["$amenity.icon", 0] },
			});

		res.status(200).json(getResponseFormat(complaints));
	} catch (error) {
		sendError(res, error);
	}
};

export const store = async (req, res) => {
	const complaint = validateCreate(req, res);
	if (!complaint) return;

	// Add auth user as complaint userId
	complaint.userId = req.authUser.id;

	const newComplaint = new Complaint(complaint);

	// Check if amenity exists
	const amenity = await findOrFail(
		complaint.amenityId,
		res,
		"amenity",
		Amenity
	);
	if (!amenity) return;

	// Check if user has that amenity

	try {
		await newComplaint.save();
		req.app.emit("complaints:cache");

		res.status(201).json(
			getResponseFormat(newComplaint, "Successfully added complaint.")
		);
	} catch (error) {
		sendError(res, "hi");
	}
};

export const show = async (req, res) => {
	const complaint = await findOrFail(
		req.params.id,
		res,
		"complaint",
		Complaint
	);
	if (complaint) res.json(getResponseFormat(complaint));
};

export const update = async (req, res, next) => {
	const newComplaint = validateUpdate(req, res);
	const oldComplaint = await findOrFail(
		req.params.id,
		res,
		"complaint",
		Complaint
	);

	if (!oldComplaint) return;

	try {
		const updatedComplaint = await Complaint.findByIdAndUpdate(
			oldComplaint._id,
			newComplaint,
			{
				new: true, //By default, findByIdAndUpdate() returns the document as it was before update was applied. If you set new: true, findOneAndUpdate() will instead give you the object after update was applied
			}
		);
		req.app.emit("complaints:cache");

		res.status(202).json(
			getResponseFormat(
				updatedComplaint,
				"Complaint updated successfully."
			)
		);
	} catch (error) {
		sendError(res, error);
	}
};

export const destroy = async (req, res) => {
	const complaint = await findOrFail(
		req.params.id,
		res,
		"complaint",
		Complaint
	);

	if (!complaint) return;

	try {
		await Complaint.findByIdAndRemove(complaint._id);
		req.app.emit("complaints:cache");

		res.json(getResponseFormat(204, "Complaint deleted successfully."));
	} catch (error) {
		sendError(res, error);
	}
};
