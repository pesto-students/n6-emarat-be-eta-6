import  admin from 'firebase-admin';
import Logger from './logging.js';

export const isDevelopmentEnv = () => {
    const env = process.env.NODE_ENV || 'development'
    return env === 'development';
}

export const createToken = async ({uid, additionalClaims = {}}) => {
    try {
        const customToken = await admin.auth().createCustomToken(uid, additionalClaims);
        console.log('token', customToken)
        Logger.info(`Custom Token ${customToken}`)
        return customToken;
    } catch (err) {
        Logger.error(`err creating custom token: ${err}`);
        return '';
    }
}

export const verifyToken = async(idToken) => {
    try{
        const decodedToken = await admin
        .auth()
        .verifyIdToken(idToken);
        return decodedToken;
    } catch( err) {
        Logger.error(`error when verifyIdToken: ${err}`);
    }
}

export const getResponseErrorFormat = (msg = 'Something Went Wrong with server', errCode = '500') => ({
    meta: {
        success: false,
        msg,
        errCode,
    }
})
