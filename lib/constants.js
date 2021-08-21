// Define your severity levels. 
// With them, You can create log files, 
// see or hide levels based on the running ENV.
export const LOG_LEVELS = {
    error: 0,
    warn: 1,
    info: 2,
    http: 3,
    debug: 4,
}

// Define different colors for each level. 
// Colors make the log message more visible,
// adding the ability to focus or ignore messages.
export const LOG_LEVEL_COLORS = {
    error: 'red',
    warn: 'yellow',
    info: 'green',
    http: 'magenta',
    debug: 'white',
}

export const FIREBASE_ADMIN_SDK = {
    "type": "service_account",
    "project_id": "e-marat",
    "private_key_id": process.env.FIREBASE_PRIVATE_KEY_ID,
    "private_key": process.env.FIREBASE_PRIVATE_KEY,
    "client_email": "firebase-adminsdk-me2cr@e-marat.iam.gserviceaccount.com",
    "client_id": "101268319817213841463",
    "auth_uri": "https://accounts.google.com/o/oauth2/auth",
    "token_uri": "https://oauth2.googleapis.com/token",
    "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
    "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-me2cr%40e-marat.iam.gserviceaccount.com"
}

export const API_ERROR_CODES = {

}

export const OTP_EXPIRE_TIME_IN_MINUTES = 5;
export const TEST_MASTER_OTP = '123456';