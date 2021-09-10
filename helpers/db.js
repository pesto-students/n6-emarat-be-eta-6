import mongoose from "mongoose";
import { getResponseErrorFormat } from "../lib/utils.js";

// Params : ObjectId, Express Router response, Name of item, Mongoose schema
export const findOrFail = async ({ schemaId, res, context, schema }) => {
	if (mongoose.isValidObjectId(schemaId)) {
		try {
			const item = await schema.findById(schemaId);
			if (item) return item;
		} catch (error) {
			sendError(res, error);
		}
	}

	res.status(404).json(
		getResponseErrorFormat(`No ${context} with id: ${schemaId}`)
	);
	return false;
};

export const filterForUser = (req, userIdFieldName = "userId") => {
	if (!req || !req.authUser) throw Error("No authorised user");

	return {
		[userIdFieldName]: new mongoose.Types.ObjectId(req.authUser.id),
	};
};

export const filterIfResident = (req, userIdFieldName = "userId") => {
	let match = {};

	if (!req || !req.authUser) throw Error("No authorised user");

	// If is not admin then only show the user's complaints
	if (!req.authUser.isAdmin) {
		match = filterForUser(req, userIdFieldName);
	}

	return match;
};
