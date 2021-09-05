import { getResponseErrorFormat } from "../../lib/utils.js";

export default async function (req, res, next) {
	if (req.authUser.isAdmin)
		return res
			.status(403)
			.send(
				getResponseErrorFormat(
					"Access Denied. Only residents allowed.",
					403
				)
			);
	next();
}
