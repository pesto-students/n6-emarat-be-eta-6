import { readFile } from "fs/promises";
import admin from "firebase-admin";

export const initFirebaseAuth = async () => {
	if (admin.apps.length) return admin.app();

	const credentials = JSON.parse(
		await readFile(
			new URL("./firebase-service-account-key.json", import.meta.url)
		)
	);

	return admin.initializeApp({
		credential: admin.credential.cert(credentials),
		databaseURL: process.env.FIREBASE_DB_URL,
	});
};

export const firebaseDbRef = () => admin.database().ref();
