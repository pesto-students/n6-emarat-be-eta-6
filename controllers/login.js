import { createToken } from "../helpers/firebase.js";
import { RESPONSE_HEADER_TOKEN } from "../lib/constants.js";
import { getResponseErrorFormat, getResponseFormat } from "../lib/utils.js";
import User from "../models/user.js";

export const loginOrRefreshToken = async(req, res) => {
    const { phone, id } = req.authUser;
    const countryCode = process.env.COUNTRY_CODE || '+91';

	try {
        let user;
        if(id) {
            user = await User.findById(id);
        } else {
            const _phone = phone.split(countryCode)[1];
            user = await User.findOne({ phone: _phone });
        }
		if (!user) return returnInvalidTokenErr(res);
		const authorizationToken = await createTokenWithUserClaims(user);
        return res.set(RESPONSE_HEADER_TOKEN, authorizationToken ).send(getResponseFormat());

	} catch (error) {
		return res.status(403).send(getResponseErrorFormat(error));
	}
}

const returnInvalidTokenErr = (res) => (
    res.status(400)
    .send(
    getResponseErrorFormat(
        "Invalid Token",
        "400"
    )
));

const createTokenWithUserClaims = async (user) => {
    const _user = user.toObject();
    const {
        isAdmin = false,
        firstName,
        lastName,
        picture = "",
        phone,
        _id,
        flat,
    } = _user;

    const uniqueId = `${_id}`;
    const authorizationToken = await createToken({
        uid: uniqueId,
        additionalClaims: {
            isAdmin,
            firstName,
            lastName,
            picture,
            phone,
            uniqueId,
            flat,
        },
    });
    return authorizationToken;
}

export const mockLogin = async(req, res) => {
    const { type } = req.body;
    const phone = type === 'admin' ? '9999999999' : '8888888888';
    try {
        const user = await User.findOne({ phone });
    if (!user) return returnInvalidTokenErr(res);
		const authorizationToken = await createTokenWithUserClaims(user);
        return res.set(RESPONSE_HEADER_TOKEN, authorizationToken ).send(getResponseFormat());
    } catch (error) {
		return res.status(403).send(getResponseErrorFormat(error));
	}
}
