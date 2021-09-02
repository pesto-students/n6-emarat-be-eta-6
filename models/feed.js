import mongoose from "mongoose";

const Schema = mongoose.Schema;

const feedSchema = new Schema({
	id: {
		type: Schema.Types.ObjectId,
		required: true,
	},
	userId: {
		type: Schema.Types.ObjectId,
	},
	text: {
		type: String,
		minlength: 1,
		maxlength: 5000,
	},
	image: {
		type: String,
		minlength: 5,
		maxlength: 200,
	},
	createdAt: {
		type: Date,
		default: Date.now,
		required: true,
	},
	reactions: [
		new Schema({
			userId: {
				type: Schema.Types.ObjectId,
				required: true,
			},
			type: {
				type: String,
				enum: ["like", "laugh", "sad", "congrats"],
				required: true,
			},
		}),
	],
	comments: [
		new Schema({
			userId: {
				type: Schema.Types.ObjectId,
			},
			text: {
				type: String,
				maxlength: 2000,
				minlength: 2,
				required: true,
			},
			createdAt: {
				type: Date,
				default: Date.now,
				required: true,
			},
		}),
	],
});

export const Feed = mongoose.model("Feed", feedSchema);
