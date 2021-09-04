import mongoose from "mongoose";

const Schema = mongoose.Schema;

const transactionSchema = {
    orderId: {
        type: String,
        required: true,
        unique: true,
    },
    paidMonth: String,
    amount: {
        type: Number,
        max: 99999,
        min: 1,
        required: true,
    },
    status: {
        type: String,
        enum: ['pending','success', 'failed'],
        required: true,
    },
    paymentId: {
        type: String,
        maxlength: 200,
        minlength: 5,
    },
    processedAt: {
        type: Date,
        default: Date.now,
    },
};

const userSchema = new Schema({
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
	createdAt: {
		type: Schema.Types.Date,
		default: Date.now,
		required: true,
	},
	updatedAt: {
		type: Date,
		default: Date.now,
		required: true,
	},
	transactions: [transactionSchema],
	amenities: [
		{
			type: Schema.Types.ObjectId,
			required: true,
		},
	],
    lastPaymentAt: String,
});

export default mongoose.model("User", userSchema);
