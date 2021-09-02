import mongoose from "mongoose";

const Schema = mongoose.Schema;

const complaintSchema = new Schema(
	{
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
			required: true,
			minlength: 2,
			maxlength: 2000,
		},
		status: {
			type: String,
			enum: ["raised", "progress", "resolved", "rejected"],
			default: "raised",
		},
		comment: {
			type: String,
			minlength: 2,
			maxlength: 2000,
		},
	},
	{
		timestamps: true,
	}
);

export default mongoose.model("Complaint", complaintSchema);
