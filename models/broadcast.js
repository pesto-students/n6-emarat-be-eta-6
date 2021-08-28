import Joi from "joi";
import mongoose from "mongoose";

const Schema = mongoose.Schema;

const schema = new Schema({
	announcement: {
		type: String,
		minlength: 2,
		maxlength: 5000,
        required: true,
	},
	picture: {
		type: String,
		minlength: 5,
		maxlength: 200,
	},
	createdAt: {
		type: Date,
		default: Date.now,
		required: true,
	},
});

export const Broadcast = mongoose.model("Broadcast", schema);

export const broadcastSchema = Joi.object({
    announcement: Joi.string().min(2).max(300).required(),
	picture: Joi.string().min(5).max(200),
});
