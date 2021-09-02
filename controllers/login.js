import { createToken } from "../config/firebaseAuth.js";
import { CUSTOM_API_CODES } from "../lib/constants.js";
import { getResponseErrorFormat, getResponseFormat } from "../lib/utils.js";
import User from "../models/user.js";
import { getToken } from "../middleware/auth.js";

export const postLogin = async (req, res) => {
	const token = await getToken(req, res);

	if (!token) return;

	const { phone_number = "" } = token;
	const phone = phone_number.split("+91")[1];

	const user = await User.findOne({ phone });
	if (!user)
		return res
			.status(404)
			.send(
				getResponseErrorFormat(
					"User with requested phone not found",
					"400"
				)
			);

	const _user = user.toObject();
	const { isAdmin = false, firstName, lastName, picture = "", _id } = _user;
	const uniqueId = `${_id}`;
	const { authorizationToken, error } = await createToken({
		uid: uniqueId,
		additionalClaims: {
			isAdmin,
			firstName,
			lastName,
			picture,
			phone,
			uniqueId,
		},
	});

	if (error) return res.status(401).send(getResponseErrorFormat(error));

	return res.send(
		getResponseFormat(
			{ authorizationToken },
			"",
			CUSTOM_API_CODES.AUTH_TOKEN
		)
	);
};
