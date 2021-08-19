import  admin from 'firebase-admin';

export const createToken = async ({uid, additionalClaims = {}}) => {
    try {
        const customToken = await admin.auth().createCustomToken(uid, additionalClaims);
        return customToken;
    } catch (err) {
        console.log('err creating custom token: ',err);
        return '';
    }
}
