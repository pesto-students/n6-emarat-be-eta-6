import mongoose from "mongoose";
import Logger from "../lib/logging.js";

export default async () => {
	const CONNECTION_STRING = process.env.MONGO_DB_CONNECTION_STRING;

	try {
		const conn = await mongoose.connect(CONNECTION_STRING, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
			useCreateIndex: true,
			useFindAndModify: false,
		});
		Logger.debug(`MongoDB Connected: ${conn.connection.host}`);
		return conn.connection.getClient();
	} catch (error) {
		Logger.error(`Mongo db connection error, error -> ${error.message}`);
		process.exit(1);
	}
};
