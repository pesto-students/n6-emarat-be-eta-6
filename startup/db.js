import mongoose from 'mongoose';

export default async () => {
    const CONNECTION_STRING = process.env.MONGO_DB_CONNECTION_STRING;

    try {
        const conn = await mongoose.connect(CONNECTION_STRING, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
        });
        console.log(`MongoDB Connected: ${conn.connection.host}`);
        return conn.connection.getClient();
    }
    catch (error) {
        console.log(error);
        process.exit(1);
    }
}