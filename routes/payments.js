import express from 'express';
import shortid from 'shortid';
import crypto from 'crypto';
import { calculatePaymentAmount, getResponseFormat } from "../lib/utils.js";
import { User, } from "../models/user.js";
import { sendError,} from "../helpers/response.js";
import razorpay from '../config/razorpary.js';
import auth from '../middleware/auth.js';

const router = express.Router();

const amenities = [
    {name: 'gym', fee: 400},
    {name: 'wifi', fee: 800},
    {name: 'swimming', fee: 900},
    {name: 'yoga', fee: 500},
    {name: 'laundry', fee: 400},
]

router.get("/", [auth], async (req, res) => {
    const { phone } = req.user;
    try {
        const user = await User.findOne({ phone });
        const userObject =  user.toObject();
        const { createdAt, lastPaymentAt } = userObject;
        const paymentMeta = calculatePaymentAmount({createdAt, lastPaymentAt, amenities});
        
        const resObj = {
            amenities,
            ...paymentMeta,
        }
        return res.send(getResponseFormat(resObj));
    } catch (err) {
        return sendError(res, err);
    }
});

router.post("/order/", [auth], async (req, res) => {
    const { phone } = req.user;
    try {
        const user = await User.findOne({ phone });
        const userObject =  user.toObject();
        const { createdAt, lastPaymentAt, _id } = userObject;
        const userId = `${_id}`
        const paymentMeta = calculatePaymentAmount({createdAt, lastPaymentAt, amenities});
        const { total, fromDate, toDate } = paymentMeta;

        const receipt = `${shortid.generate()}`;

        const options = {
            amount: `${total * 100}`,
            currency: "INR",
            receipt,
            notes: { receipt, userId, fromDate, toDate },
        };

        const order = await razorpay.orders.create(options)
        return res.send(getResponseFormat(order));

    } catch (err) {
        return sendError(res, err);
    }
});


router.post('/verify/', async (req, res) => {
        const secret = process.env.RAZORPAY_WEBHOOK_SECRET;

        const shasum = crypto.createHmac('sha256', secret);
        shasum.update(JSON.stringify(req.body));
        const digest = shasum.digest('hex');

        if(digest === req.headers['x-razorpay-signature']) {
            const { id: paymentId, order_id: orderId, notes = {}, status, amount, created_at } = req.body?.payload.payment.entity;
            const { userId, toDate, fromDate,  } = notes;

            const transaction = { 
                orderId,
                amount: amount / 100,
                fromDate,
                toDate,
                status: status === 'captured' ? 's' : 'f',
                paymentId,
                processedAt: new Date(created_at * 1000),
            };
            await User.findByIdAndUpdate(userId, { $push: { transactions: transaction  }, lastPaymentAt: toDate });

        } 
        res.send({status: 'ok'});
})


export default router;
