import express from "express";
import { sendError } from "../helpers/response.js";
import { MONTHS_SHORT } from "../lib/constants.js";
import { getResponseFormat } from "../lib/utils.js";
import User from "../models/user.js";

const router = express.Router();

router.get("/", async (req, res) => {
	const { id: userId, isAdmin } = req.authUser;
	try {
		let users = [];
		if (isAdmin) {
			users = await User.find();
		} else {
			const user = await User.findById(userId);
			users = [user];
		}

		const allTransactions = [];
		users.forEach((userDetails) => {
			const userDetailsObj = userDetails.toObject();
			const {
				transactions = [],
				firstName,
				lastName,
				picture,
				phone,
				flat,
			} = userDetailsObj;
			transactions.forEach((transaction) => {
				const { paidMonth, status } = transaction;
				let month = "";
				if (status === "success") {
					const [monthCode, year] = paidMonth.split("_");
					month = `${MONTHS_SHORT[monthCode]} ${year}`;
				}
				allTransactions.push({
					...transaction,
					firstName,
					lastName,
					picture,
					phone,
					flat,
					month,
					name: `${firstName} ${lastName}`,
				});
			});
		});
		allTransactions.sort((transaction1, transaction2) => {
			return new Date(transaction2.processedAt) - new Date(transaction1.processedAt);
		});
		return res.send(getResponseFormat(allTransactions));
	} catch (err) {
		return sendError(res, err);
	}
});

export default router;
