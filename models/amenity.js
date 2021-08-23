import mongoose from "mongoose";

const Schema = mongoose.Schema;

const amenitySchema = new Schema({
	id: {
		type: Schema.Types.ObjectId,
	},
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
	createdAt: {
		type: Date,
		default: date.now,
		required: true,
	},
});

export const Amenity = mongoose.model("Amenity", amenitySchema);
