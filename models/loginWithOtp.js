import Joi from 'joi';
import mongoose from "mongoose";

const loginSchema = new mongoose.Schema({
	phone: String,
    otp: String,
	createdAt: {
		type: Date,
		default: new Date()
	},
});


export const loginModel = mongoose.model('Auth', loginSchema);

export const loginJoiSchema = Joi.object({
    phone: Joi.string().regex(/^\d{10}$/).required(),
    otp: Joi.string().length(6),
    _id: Joi.string()
});
