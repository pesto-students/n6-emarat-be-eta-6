import { getResponseErrorFormat } from "../lib/utils.js";
import mongoose from "mongoose";

export const sendError = (res, error, code = 409) => {
	if (!res.headersSent)
		res.status(code).json(getResponseErrorFormat(error.message));
};

export const findItemById = async (req, res, item_name, Schema) => {
	const { id } = req.params;

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
