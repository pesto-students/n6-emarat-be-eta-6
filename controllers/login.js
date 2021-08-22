import mongoose from "mongoose";
import { verifyToken, addCustomClaims } from "../config/firebaseAuth.js";

export const postLogin = async (req, res) => {
	const token = req.body.token;

	if (token) {
		const decodedToken = await verifyToken(token);
		const claims = { isAdmin: true };

		if (decodedToken) {
			addCustomClaims(decodedToken.uid, claims);
			res.json({ status: "success" });
		}
	}

	res.json({ status: "invalid token" });
};
