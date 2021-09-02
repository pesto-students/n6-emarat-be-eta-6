import mongoose from "mongoose";

const Schema = mongoose.Schema;

var complaintSchema = new Schema({
	data: [
		new Schema({
			userId: {
				type: Schema.Types.ObjectId,
				required: true,
			},
			amenityId: {
				type: Schema.Types.ObjectId,
				required: true,
			},
			description: {
				type: String,
				minlength: 2,
				maxlength: 2000,
			},
			status: {
				type: String,
				enum: ["raised", "progress", "rejected", "resolved"],
			},
			comment: {
				type: String,
				minlength: 2,
				maxlength: 2000,
			},
			createdAt: {
				type: Date,
				default: Date.now,
			},
		}),
	],
	computed: new Schema({
		count: new Schema({
			pending: {
				type: Number,
			},
			resolved: {
				type: Number,
			},
			inProgress: {
				type: Number,
			},
			rejected: {
				type: Number,
			},
			byPeriod: [
				new Schema({
					periodStart: {
						type: Date,
					},
					periodEnd: {
						type: Date,
					},
					rejected: {
						type: Number,
					},
					pending: {
						type: Number,
					},
					resolved: {
						type: Number,
					},
					inProgress: {
						type: Number,
					},
				}),
			],
		}),
	}),
});

export const Feed = mongoose.model("Complaint", complaintSchema);
