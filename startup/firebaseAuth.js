import  admin from 'firebase-admin';
import { FIREBASE_ADMIN_SDK } from '../config/constants.js';

export default () => admin.initializeApp({ credential: admin.credential.cert(FIREBASE_ADMIN_SDK)});
