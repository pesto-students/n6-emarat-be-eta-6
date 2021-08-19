import  admin from 'firebase-admin';

export const isDevelopmentEnv = () => {
    const env = process.env.NODE_ENV || 'development'
    return env === 'development';
}

export const createToken = async ({uid, additionalClaims = {}}) => {
    try {
        const customToken = await admin.auth().createCustomToken(uid, additionalClaims);
        return customToken;
    } catch (err) {
        console.log('err creating custom token: ',err);
        return '';
    }
}
