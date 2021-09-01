import Joi from "joi";
import mongoose from "mongoose";

const Schema = mongoose.Schema;

const transcationsSchema = new Schema(
	{
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
	},
	{
		timestamps: true,
	}
);

const userSchema = new Schema(
	{
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
		amenties: [
			{
				type: Schema.Types.ObjectId,
			},
		],
		transcations: [transcationsSchema],
	},
	{
		timestamps: true,
	}
);

export default mongoose.model("User", userSchema);
