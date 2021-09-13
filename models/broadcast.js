import Joi from "joi";
import mongoose from "mongoose";
import user from "./user.js";

const Schema = mongoose.Schema;

const schema = new Schema({
    title: {
        type: String,
        minlength: 2,
        maxlength: 100,
        required: true,
    },
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
    user: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: user
    }
});

export const Broadcast = mongoose.model("Broadcast", schema);

export const broadcastSchema = Joi.object({
    title: Joi.string().min(2).max(100).required(),
    announcement: Joi.string().min(2).max(1000).required(),
	picture: Joi.string().min(5).max(200),
});
