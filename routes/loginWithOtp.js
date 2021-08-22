import { differenceInMinutes } from "date-fns";
import express from "express";
import { CUSTOM_API_CODES, OTP_EXPIRE_TIME_IN_MINUTES, TEST_MASTER_OTP } from "../lib/constants.js";
import { createToken, generateOtp, getResponseErrorFormat, getResponseFormat } from "../lib/utils.js";
import { loginJoiSchema, loginModel } from "../models/loginWithOtp.js";
const router = express.Router();
import { User } from '../models/user.js';

router.post('/otp', async (req, res) => {
    const { body = {} } = req;
    const { phone } = body;
    const { error } = loginJoiSchema.validate(body);
    if (error) 
        return res.status(400).send(getResponseErrorFormat(error.details[0].message, '400'));

    const user = await User.findOne({ phone });
    if (!user) 
        return res.status(400).send(getResponseErrorFormat('Invalid phone number', '400'));

    const otp = generateOtp();
    const mobileWithOtp =  new loginModel({phone, otp })
    const savedOtpObj = await mobileWithOtp.save();

    const { _id, createdAt } = savedOtpObj;
    return res.send(getResponseFormat({
        msg: 'Otp send successfuly.',
        _id,
        createdAt,
        otpExpireTime: OTP_EXPIRE_TIME_IN_MINUTES
    }));
});

router.post('/loginwithotp', async (req, res) => {
    const { body = {} } = req;
    const { phone = '', otp = '', _id } = body;
    const { error } = loginJoiSchema.validate(body);
    if (error) 
        return res.status(400).send(getResponseErrorFormat(error.details[0].message, '400'));

    if (!otp) 
        return res.status(400).send(getResponseErrorFormat('Invalid Otp', '400'));
    
    if (!_id) 
        return res.status(400).send(getResponseErrorFormat('Invalid Request', '400'));
    
    const user = await User.findOne({ phone });
    if (!user) 
        return res.status(400).send(getResponseErrorFormat('Invalid phone number', '400'));

    if (! (otp === TEST_MASTER_OTP)) {
        const targetedOtp = await loginModel.findById(_id);
        if (!targetedOtp) 
            return res.status(400).send(getResponseErrorFormat('Invalid Request.', '400'));
    
        const { createdAt } = targetedOtp;
        const differentInMins = differenceInMinutes(new Date(), createdAt);
    
        if(differentInMins >= OTP_EXPIRE_TIME_IN_MINUTES)
            return res.status(400).send(getResponseErrorFormat('Otp Time expired', '400'));
    } 

    const { isAdmin = false } = user;
    const token = await createToken({uid: phone, additionalClaims: {isAdmin}});
    res.send(getResponseFormat({token}, CUSTOM_API_CODES.AUTH_TOKEN));
});


export default router;
