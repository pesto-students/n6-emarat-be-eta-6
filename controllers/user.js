import { getResponseErrorFormat, getResponseFormat } from "../lib/utils.js";
import { firebaseDbRef } from "../config/firebase.js";
import User from "../models/user.js";
import { sendError } from "../helpers/response.js";
import { findOrFail } from "../helpers/db.js";
import validate from "../requests/user.js";

export const index = async (req, res) => {
	if (!req.query.phone) {
		try {
			const users = await User.find().sort({ updatedAt: -1 });
			return res.json(getResponseFormat(users));
		} catch (error) {
			return sendError(res, error);
		}
	}

	try {
		const user = await User.findOne({ phone: req.query.phone });

		if (!user)
			return res
				.status(404)
				.send(
					getResponseErrorFormat(
						"User with requested phone not found",
						"400"
					)
				);
		res.send(getResponseFormat(user));
	} catch (error) {
		return sendError(res, error);
	}
};

export const store = async (req, res) => {
	const body = validate(req, res);

	try {
		let user = await User.findOne({ phone: body.phone });

		if (user) {
			return res
				.status(400)
				.send(getResponseErrorFormat("User already exists", "400"));
		}

		user = new User(body);
		user = await user.save();

		if (user?._id) {
			// Insert into firebase
			await firebaseCollection().child(`${user._id}`).set(body);
			// Update redis cache
			req.app.emit("amenities:cache");
		}

		res.send(getResponseFormat(user, "User Created Successfully!"));
	} catch (error) {
		sendError(res, error);
	}
};

export const show = async (req, res) => {
	try {
		const user = await User.findById(req.params.id);
		return user
			? res.send(getResponseFormat(user))
			: res
					.status(404)
					.send(
						getResponseErrorFormat(
							"User with requested Id not found",
							"400"
						)
					);
	} catch (error) {
		sendError(res, error);
	}
};

export const update = async (req, res) => {
	return await updateUser(req, res);
};

export const destroy = async (req, res) => {
	try {
		const user = await findOrFail(req.params.id, res, "user", User);
		if (!user) return;
		const deletedUser = await User.findByIdAndRemove(user._id);

		if (deletedUser?._id) {
			// Delete from firebase
			await firebaseCollection().child(`${user._id}`).remove();
			// Update redis cache
			req.app.emit("amenities:cache");
		}

		res.json(getResponseFormat(204, "User deleted successfully."));
	} catch (error) {
		sendError(res, error);
	}
};

export const currentUserAmenities = async (req, res) => {
	try {
		let amenities = await User.findById(req.authUser.id).select(
			"amenities"
		);

		amenities = amenities && amenities.amenities ? amenities.amenities : [];

		res.status(200).json(getResponseFormat(amenities));
	} catch (error) {
		sendError(res, error);
	}
};

export const currentUserProfile = async (req, res) => {
	try {
		const user = await User.findById(req.authUser.id).select({
			firstName: 1,
			lastName: 1,
			phone: 1,
			picture: 1,
			flat: 1,
		});

		return user
			? res.send(getResponseFormat(user))
			: res
					.status(404)
					.send(
						getResponseErrorFormat(
							"User with requested Id not found",
							"400"
						)
					);
	} catch (error) {
		sendError(res, error);
	}
};

const updateUser = async (req, res, userId) => {
	const id = userId || req.params.id;

	try {
		const user = await findOrFail(req.params.id, res, "user", User);
		if (!user) return;

		const body = validate(req, res);
		if (!body) return;
		const updatedUser = await User.findByIdAndUpdate(id, body, {
			new: true,
		});

		if (updatedUser?._id) {
			// Update in firebase
			await firebaseCollection().child(id).update(body);
			// Update redis cache
			req.app.emit("amenities:cache");
		}

		res.send(getResponseFormat(updatedUser, "Updated successfully"));
	} catch (error) {
		sendError(res, error);
	}
};

export const updateCurrentUserProfile = async (req, res) => {
	return await updateUser(req, res, req.authUser.id);
};

const firebaseCollection = () => firebaseDbRef().child("users");
