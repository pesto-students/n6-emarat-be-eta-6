import mongoose from "mongoose";

const Schema = mongoose.Schema;

const broadcastSchema = new Schema({
	id: {
		type: Schema.Types.ObjectId,
		required: true,
	},
	text: {
		type: String,
		minlength: 2,
		maxlength: 5000,
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

export const Broadcast = mongoose.model("Broadcast", broadcastSchema);
