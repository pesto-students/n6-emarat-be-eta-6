import Joi from 'joi';
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    isAdmin: Boolean,
	firstName: String,
	lastName: String,
	phone: String,
	createdAt: {
		type: Date,
		default: new Date()
	},
	updatedAt: {
		type: Date,
		default: new Date()
	},
    flat: String,
});


export const User = mongoose.model('User', userSchema);

export const joiSchema = Joi.object({
    isAdmin: Joi.bool().required(),
    firstName: Joi.string().max(20).required(),
    lastName: Joi.string().min(2).max(20).required(),
    phone: Joi.string().regex(/^\d{10}$/).required(),
    createdAt: Joi.date(),
    updatedAt: Joi.date(),
    flat: Joi.string(),
});
