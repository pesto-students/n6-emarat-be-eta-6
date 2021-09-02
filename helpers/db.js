import mongoose from "mongoose";
import { getResponseErrorFormat } from "../lib/utils.js";

// Params : ObjectId, Express Router response, Name of item, Mongoose schema
export const findOrFail = async (id, res, item_name, Schema) => {
	if (mongoose.isValidObjectId(id)) {
		try {
			const item = await Schema.findById(id);
			if (item) return item;
		} catch (error) {
			sendError(res, error);
		}
	}

	res.status(404).json(
		getResponseErrorFormat(`No ${item_name} with id: ${id}`)
	);
	return false;
};
