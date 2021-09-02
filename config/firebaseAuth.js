import { readFile } from "fs/promises";
import admin from "firebase-admin";
import Logger from "../lib/logging.js";

export const initFirebaseAuth = async () => {
	const credentials = JSON.parse(
		await readFile(
			new URL("./firebase-service-account-key.json", import.meta.url)
		)
	);

	admin.initializeApp({
		credential: admin.credential.cert(credentials),
	});
};

// Return decoded token if token valid, otherwise return false
export const verifyToken = async (token) => {
	const result = { decodedToken: "", error: false };

	try {
		result.decodedToken = await admin.auth().verifyIdToken(token);
	} catch (error) {
		result.error = error.message;
	} finally {
		return result;
	}
};

export const addCustomClaims = async (uid, claims) => {
	return await admin.auth().setCustomUserClaims(uid, claims);
};

export const createToken = async ({ uid, additionalClaims = {} }) => {
	const result = { token: "", error: false };

	try {
		result.token = await admin
			.auth()
			.createCustomToken(uid, additionalClaims);
	} catch (error) {
		result.error = error.message;
	} finally {
		return result;
	}
};
