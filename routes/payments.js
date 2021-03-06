import express from "express";
import shortid from "shortid";
import crypto from "crypto";
import {
	calculatePaymentAmount,
	getResponseErrorFormat,
	getResponseFormat,
    filterBasicAmenities,
} from "../lib/utils.js";
import User from "../models/user.js";
import Amenity from "../models/amenity.js";
import { sendError } from "../helpers/response.js";
import razorpay from "../config/razorpary.js";
import userAuth from "../middleware/auth/user.js";
import resident from "../middleware/auth/resident.js";


const router = express.Router();

router.get("/", [userAuth, resident], async (req, res) => {
	const { id: userId } = req.authUser;
	try {
		const user = await User.findById(userId).populate("amenities");
        const allAmenities = await Amenity.find();
        const basicAmenities = filterBasicAmenities(allAmenities, 'yes');
		const userObject = user.toObject();
		const { createdAt, lastPaymentAt, amenities: userAmenities = [] } = userObject;
        const amenities = [...userAmenities, ...basicAmenities];
		const paymentMeta = calculatePaymentAmount({
			createdAt,
			lastPaymentAt,
			amenities,
		});

		const resObj = {
			amenities,
			...paymentMeta,
		};
		return res.send(getResponseFormat(resObj));
	} catch (err) {
		return sendError(res, err);
	}
});

router.post("/order/", [userAuth, resident], async (req, res) => {
	const { id: userId } = req.authUser;
	try {
		const user = await User.findById(userId).populate("amenities");
        const allAmenities = await Amenity.find();
        const basicAmenities = filterBasicAmenities(allAmenities, 'yes');
		const userObject = user.toObject();
		const { createdAt, lastPaymentAt, amenities: userAmenities = [] } = userObject;
        const amenities = [...userAmenities, ...basicAmenities];
		const { pay, paymentMonth } = calculatePaymentAmount({
			createdAt,
			lastPaymentAt,
			amenities,
		});

		if (pay < 1) {
			return res
				.status(400)
				.send(
					getResponseErrorFormat(
						"The amount must be atleast INR 1.00"
					)
				);
		}
		const receipt = `${shortid.generate()}`;

		const options = {
			amount: `${pay * 100}`,
			currency: "INR",
			receipt,
			notes: { userId },
		};

		const order = await razorpay.orders.create(options);
		const { id: orderId, amount } = order;
		user.transactions.push({
			orderId,
			amount: +amount / 100,
			status: "pending",
			paidMonth: paymentMonth,
		});
		await user.save();
		return res.send(getResponseFormat(order));
	} catch (err) {
		return sendError(res, err);
	}
});

router.post("/verify/", async (req, res) => {
	const secret = process.env.RAZORPAY_WEBHOOK_SECRET;

	const shasum = crypto.createHmac("sha256", secret);
	shasum.update(JSON.stringify(req.body));
	const digest = shasum.digest("hex");

	if (digest === req.headers["x-razorpay-signature"]) {
		const {
			id: paymentId,
			order_id: orderId,
			notes = {},
			status,
			created_at,
		} = req.body?.payload.payment.entity;
		const { userId } = notes;

		const user = await User.findById(userId);
		if (!user) return res.status(400).send("Invalid userId");

		const transaction = user.transactions.find(
			(tr) => tr.orderId === orderId
		);

		if (!transaction) return res.status(400).send("Invalid orderId");
		const { paidMonth } = transaction;

		const isSuccessPayment = status === "captured";

		transaction.status = isSuccessPayment ? "success" : "failed";
		transaction.processedAt = new Date(created_at * 1000);
		transaction.paymentId = paymentId;

		if (isSuccessPayment) user.lastPaymentAt = paidMonth;
		user.save();
	}
	res.send({ status: "ok" });
});

export default router;
