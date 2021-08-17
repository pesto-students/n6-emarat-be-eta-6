import mongoose from 'mongoose';

const connectDB = async () =>
{
	const CONNECTION_STRING = process.env.MONGO_DB_CONNECTION_STRING;

	try
	{
		const conn = await mongoose.connect(CONNECTION_STRING, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
			useFindAndModify: false // https://mongoosejs.com/docs/deprecations.html
		});
		console.log(`MongoDB Connected: ${conn.connection.host}`);

		// console.log(conn.connection.db);

		return conn.connection.getClient();
	}
	catch (error)
	{
		console.log(error);
		process.exit(1);
	}
}

export default connectDB;
