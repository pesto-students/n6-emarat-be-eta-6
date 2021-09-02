import { getResponseErrorFormat, getResponseFormat } from "../lib/utils.js";
import User from "../models/user.js";
import { sendError } from "../helpers/response.js";
import { findOrFail } from "../helpers/db.js";
import validate from "../requests/user.js";

export const index = async (req, res) => {
	if (!req.query.phone) {
		try {
			const users = await User.find();
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

	let user = await User.findOne({ phone: body.phone });
	if (user)
		return res
			.status(400)
			.send(getResponseErrorFormat("Phone already exists", "400"));

	user = new User(body);
	user = await user.save();
	res.send(getResponseFormat(user, "Success"));
};

export const show = async (req, res) => {
	const user = await User.findById(req.params.id);
	if (!user)
		return res
			.status(404)
			.send(
				getResponseErrorFormat(
					"User with requested Id not found",
					"400"
				)
			);

	res.send(getResponseFormat(user));
};

export const update = async (req, res) => {
	let user = await User.findById(req.params.id);
	if (!user)
		return res
			.status(404)
			.send(
				getResponseErrorFormat(
					"User with requested Id not found",
					"400"
				)
			);

	const newUser = validate(req, res);
	const updatedUser = await User.findByIdAndUpdate(req.params.id, newUser, {
		new: true,
	});

	res.send(getResponseFormat(updatedUser, "Updated successfully"));
};

export const destroy = async (req, res) => {
	const user = await findOrFail(req.params.id, res, "user", User);
	if (!user) return;

	try {
		await User.findByIdAndRemove(user._id);

		res.json(getResponseFormat(204, "User deleted successfully."));
	} catch (error) {
		sendError(res, error);
	}
};
