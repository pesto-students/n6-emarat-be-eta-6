import mongoose from "mongoose";
import Amenity from "../models/amenity.js";
import validate from "../requests/amenity.js";
import { sendError } from "../helpers/response.js";

export const index = async (req, res) => {
	try {
		const amenities = await Amenity.find();
		res.status(200).json(amenities);
	} catch (error) {
		res.status(404).json({ message: error.message });
	}
};

export const store = async (req, res) => {
	const amenity = validate(req, res);
	const newAmenity = new Amenity(amenity);

	try {
		await newAmenity.save();
		res.status(201).json(newAmenity);
	} catch (error) {
		sendError(res, error);
	}
};

export const edit = async (req, res) => {
	const amenity = await findAmenity(req, res);
	if (amenity) res.json(amenity);
};

export const update = async (req, res, next) => {
	const newAmenity = validate(req, res);
	const oldAmenity = await findAmenity(req, res);

	if (!oldAmenity) return;

	try {
		const updatedAmenity = await Amenity.findByIdAndUpdate(
			oldAmenity._id,
			newAmenity,
			{
				new: true, //By default, findByIdAndUpdate() returns the document as it was before update was applied. If you set new: true, findOneAndUpdate() will instead give you the object after update was applied
			}
		);
		res.status(202).json(updatedAmenity);
	} catch (error) {
		sendError(res, error);
	}
};

export const destroy = async (req, res) => {
	const amenity = await findAmenity(req, res);

	if (!amenity) return;

	try {
		await Amenity.findByIdAndRemove(amenity._id);

		res.sendStatus(204);
	} catch (error) {
		sendError(res, error);
	}
};

const findAmenity = async (req, res) => {
	const { id } = req.params;

	if (mongoose.isValidObjectId(id)) {
		try {
			const amenity = await Amenity.findById(id);
			if (amenity) return amenity;
		} catch (error) {
			sendError(res, error);
		}
	}

	res.status(404).end(`No amenity with id: ${id}`);
	return false;
};