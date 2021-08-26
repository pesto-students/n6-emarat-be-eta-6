import mongoose from "mongoose";

const Schema = mongoose.Schema;

const amenitySchema = new Schema(
	{
		name: {
			type: String,
			minlength: 2,
			maxlength: 100,
			required: true,
		},
		description: {
			type: String,
			maxlength: 500,
			minlength: 5,
		},
		fee: {
			type: Number,
			min: 0,
			max: 9999,
			required: true,
		},
		icon: {
			type: String,
			minlength: 5,
			maxlength: 200,
			required: true,
		},
	},
	{
		timestamps: true,
	}
);

export default mongoose.model("Amenity", amenitySchema);
