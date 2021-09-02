// Users Routes
import express from "express";
import { getResponseErrorFormat, getResponseFormat } from "../lib/utils.js";
const router = express.Router();
import { User, joiSchema } from "../models/user.js";
import { sendError, findItemById } from "../helpers/response.js";
import { joiValidator } from "../helpers/joi.js";

router.get("/", async (req, res) => {
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
});

router.post("/", async (req, res) => {
	const body = joiValidator(joiSchema, req.body, res);

	let user = await User.findOne({ phone: body.phone });
	if (user)
		return res
			.status(400)
			.send(getResponseErrorFormat("Phone already exists", "400"));

	user = new User(body);
	user = await user.save();
	res.send(getResponseFormat(user, "Success"));
});

router.get("/:id", async (req, res) => {
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
});

router.put("/:id", async (req, res) => {
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

	const newUser = joiValidator(joiSchema, req.body, res);
	const updatedUser = await User.findByIdAndUpdate(req.params.id, newUser, {
		new: true,
	});

	res.send(getResponseFormat(updatedUser, "Updated successfully"));
});

router.delete("/:id", async (req, res) => {
	const user = await findItemById(req, res, "user", User);
	if (!user) return;

	try {
		await User.findByIdAndRemove(user._id);

		res.json(getResponseFormat(204, "User deleted successfully."));
	} catch (error) {
		sendError(res, error);
	}
});

export default router;
