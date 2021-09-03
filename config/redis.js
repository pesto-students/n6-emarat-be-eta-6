import Redis from "ioredis";
import Logger from "../lib/logging.js";

const CONNECTION_STRING = process.env.REDIS_CONNECTION_STRING;

const client = new Redis(CONNECTION_STRING);

client.on("connect", () => Logger.debug(`Redis Connected`));

client.on("error", (error) => {
	Logger.error(`Redis connection error, error -> ${error.message}`);
	process.exit(1);
});

export default client;
