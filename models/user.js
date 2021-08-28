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
        maxlength: 30,
        required: true,
    },
    lastName: {
        type: String,
        minlength: 1,
        maxlength: 30,
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
	dob: {
		type: Date,
	},
	flat: {
		type: String,
		minlength: 1,
		maxlength: 10,
		required: true,
	},
	transcations: [
		new Schema({
			id: {
				type: Schema.Types.ObjectId,
				required: true,
			},
			paidFor: {
				type: Date,
			},
			amount: {
				type: Number,
				max: 99999,
				min: 1,
				required: true,
			},
			status: {
				type: String,
				enum: ["S", "F"],
				required: true,
			},
			rzpId: {
				type: String,
				maxlength: 200,
				minlength: 5,
			},
			createdAt: {
				type: Date,
				default: Date.now,
				required: true,
			},
		}),
	],
	amenties: [
		{
			type: Schema.Types.ObjectId,
		},
	],
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
});

export const User = mongoose.model("User", userSchema);

export const joiSchema = Joi.object({
	isAdmin: Joi.bool().required(),
	firstName: Joi.string().min(1).max(30).required(),
	lastName: Joi.string().min(1).max(30).required(),
	phone: Joi.string()
		.regex(/^\d{10}$/)
		.required(),
	updatedAt: Joi.date(),
	flat: Joi.string(),
});
