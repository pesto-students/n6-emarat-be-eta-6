import admin from "firebase-admin";

// Return decoded token if token valid, otherwise return false
export const verifyToken = async (token) =>
	await admin.auth().verifyIdToken(token);

export const addCustomClaims = async (uid, claims) => {
	return await admin.auth().setCustomUserClaims(uid, claims);
};

export const createToken = async ({ uid, additionalClaims = {} }) =>
	await admin.auth().createCustomToken(uid, additionalClaims);
