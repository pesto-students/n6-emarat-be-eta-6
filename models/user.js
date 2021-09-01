import Joi from "joi";
import mongoose from "mongoose";

const Schema = mongoose.Schema;

const userSchema = new Schema({
	isAdmin: {
		type: Boolean,
		default: false,
		required: true,
	},
	firstName: {
		type: String,
		minlength: 1,
		maxlength: 50,
		required: true,
	},
	lastName: {
		type: String,
		minlength: 1,
		maxlength: 50,
		required: true,
	},
	phone: {
		type: String,
		minlength: 10,
		maxlength: 10,
		required: true,
	},
	picture: {
		type: String,
		minlength: 5,
		maxlength: 200,
	},
	flat: {
		type: String,
		minlength: 1,
		maxlength: 10,
	},
	createdAt: {
		type: Schema.Types.Date,
		default: Date.now,
		required: true,
	},
	updatedAt: {
		type: Date,
		default: Date.now,
		required: true,
	},
	transactions: [
		{
			orderId: {
				type: String,
				required: true,
                unique: true,
			},
		    fromDate: Date,
            toDate: Date,
			amount: {
				type: Number,
				max: 99999,
				min: 1,
				required: true,
			},
			status: {
				type: String,
				enum: ['s', 'f'],
				required: true,
			},
			paymentId: {
				type: String,
				maxlength: 200,
				minlength: 5,
			},
			processedAt: Date,
		},
	],
	amenties: [
		{
			type: Schema.Types.ObjectId,
		},
	],
    lastPaymentAt: Date,
});

export const User = mongoose.model("User", userSchema);

export const joiSchema = Joi.object({
	isAdmin: Joi.bool(),
	firstName: Joi.string().min(1).max(50).required(),
	lastName: Joi.string().min(1).max(50).required(),
	phone: Joi.string()
		.regex(/^\d{10}$/)
		.required(),
	flat: Joi.string(),
	picture: Joi.string(),
});
