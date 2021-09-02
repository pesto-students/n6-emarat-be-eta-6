import { getResponseErrorFormat } from "../lib/utils.js";
import { verifyToken } from "../config/firebaseAuth.js";

export const shouldBeGuest = (req, res, next) => {
	if (req.body.token || req.headers.authorization) {
		res.status(401).send(getResponseErrorFormat("Unauthorised", "401"));
	}

	next();
};

export const shouldBeLoggedIn = async (req, res, next) => {
	const token = await getToken(req, res);

	if (token) {
		next();
	} else if (!res.headersSent) {
		res.status(401).send(
			getResponseErrorFormat("Unauthorised - Log in first", "401")
		);
	}
};

export const shouldBeAdmin = async (req, res, next) => {
	const token = await getToken(req, res);

	if (token && token.isAdmin) {
		next();
	} else if (!res.headersSent) {
		res.status(401).send(
			getResponseErrorFormat("Unauthorised - Only admin allowed", "401")
		);
	}
};

export const shouldBeResident = async (req, res, next) => {
	const token = await getToken(req, res);

	if (token && !token.isAdmin) {
		next();
	} else if (!res.headersSent) {
		res.status(401).send(
			getResponseErrorFormat(
				"Unauthorised - Only residents allowed",
				"401"
			)
		);
	}
};

const addAuthUserToReq = (decodedToken, req) => {
	req.authUser = {
		id: decodedToken.uniqueId,
		isAdmin: decodedToken.isAdmin,
	};

	return req;
};

export const getToken = async (req, res) => {
	const bodyToken = req.body.token;
	let headerToken = req.headers.authorization?.split(" ");
	headerToken =
		Array.isArray(headerToken) && headerToken.length > 1
			? headerToken[1]
			: headerToken;

	const token = headerToken || bodyToken;

	if (token) {
		const { decodedToken, error } = await verifyToken(token);
		if (error) {
			res.status(401).send(getResponseErrorFormat(error));
		} else {
			addAuthUserToReq(decodedToken, req);
			return decodedToken;
		}
	} else {
		res.status(401).send(getResponseErrorFormat("Unauthorised", "401"));
	}
};
