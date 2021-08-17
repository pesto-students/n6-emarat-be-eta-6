import mongoose from "mongoose";

const userSchema = mongoose.Schema({
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
	}
});

const User = mongoose.model("users", userSchema);

export default User;
