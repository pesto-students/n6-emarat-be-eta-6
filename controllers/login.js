import { createToken, verifyToken } from "../config/firebaseAuth.js";
import { CUSTOM_API_CODES } from "../lib/constants.js";
import { getResponseErrorFormat, getResponseFormat } from "../lib/utils.js";
import User from "../models/user.js";

export const postLogin = async (req, res) => {
	const { token } = req.body;

	if (!token)
		return res
			.status(400)
			.send(getResponseErrorFormat("Invalid Token", "400"));

	try {
		const decodedToken = await verifyToken(token);

		const { phone_number = "" } = decodedToken;
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
		const {
			isAdmin = false,
			firstName,
			lastName,
			picture = "",
			_id,
		} = _user;

		const uniqueId = `${_id}`;
		const authorizationToken = await createToken({
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

		return res.send(
			getResponseFormat(
				{ authorizationToken },
				"",
				CUSTOM_API_CODES.AUTH_TOKEN
			)
		);
	} catch (error) {
		return res.status(403).send(getResponseErrorFormat(error));
	}
};
