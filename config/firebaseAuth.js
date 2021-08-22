import { readFile } from "fs/promises";
import admin from "firebase-admin";

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
	try {
		return await admin.auth().verifyIdToken(token);
	} catch (error) {
		return false;
	}
};

// The Firebase Admin SDK supports defining custom attributes on user accounts. This provides the ability to implement various access control strategies, including role-based access control, in Firebase apps. These custom attributes can give users different levels of access (roles), which are enforced in an application's security rules. https://firebase.google.com/docs/auth/admin/custom-claims
export const addCustomClaims = async (uid, claims) => {
	return await admin.auth().setCustomUserClaims(uid, claims);
};
