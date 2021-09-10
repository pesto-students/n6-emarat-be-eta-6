import mongoose from "mongoose";
import Amenity from "../models/amenity.js";
import User from "../models/user.js";
import validate from "../requests/amenity.js";
import { sendError } from "../helpers/response.js";
import { findOrFail } from "../helpers/db.js";
import { getResponseFormat } from "../lib/utils.js";

export const index = async (req, res) => {
	try {
		const amenities = await Amenity.find().sort(
			req.authUser.isAdmin ? { updatedAt: -1 } : { name: 1 }
		);

		res.status(200).json(getResponseFormat(amenities));
	} catch (error) {
		sendError(res, error);
	}
};

export const store = async (req, res) => {
	const amenity = validate(req, res);
	const newAmenity = new Amenity(amenity);

	try {
		await newAmenity.save();
		req.app.emit("amenities:cache");

		res.status(201).json(
			getResponseFormat(newAmenity, "Successfully added amenity.")
		);
	} catch (error) {
		sendError(res, error);
	}
};

export const show = async (req, res) => {
	const amenity = await findOrFail({
        schemaId: req.params.id,
        res,
        context: "amenity",
        schema: Amenity
    });
	if (amenity) res.json(getResponseFormat(amenity));
};

export const update = async (req, res, next) => {
	const newAmenity = validate(req, res);
	const oldAmenity = await findOrFail({
        schemaId: req.params.id,
        res,
        context: "amenity",
        schema: Amenity
    });

	if (!oldAmenity) return;

	try {
		const updatedAmenity = await Amenity.findByIdAndUpdate(
			oldAmenity._id,
			newAmenity,
			{
				new: true, //By default, findByIdAndUpdate() returns the document as it was before update was applied. If you set new: true, findOneAndUpdate() will instead give you the object after update was applied
			}
		);
		req.app.emit("amenities:cache");

		res.status(202).json(
			getResponseFormat(updatedAmenity, "Amenity updated successfully.")
		);
	} catch (error) {
		sendError(res, error);
	}
};

export const destroy = async (req, res) => {
	const amenity = await findOrFail({
        schemaId: req.params.id,
        res,
        context: "amenity",
        schema: Amenity
    });

	if (!amenity) return;

	try {
		await Amenity.findByIdAndRemove(amenity._id);
		req.app.emit("amenities:cache");

		res.json(getResponseFormat(204, "Amenity deleted successfully."));
	} catch (error) {
		sendError(res, error);
	}
};
