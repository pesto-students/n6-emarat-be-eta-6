import express from "express";
import { CUSTOM_API_CODES } from "../lib/constants.js";
import { getResponseErrorFormat, getResponseFormat } from "../lib/utils.js";
import User from "../models/user.js"; 

const router = express.Router();

router.post("/", async(req, res) => {
    const phone = req.body.phone;
    try {
        const user = await User.findOne({phone});
        if(! user) {
            return res.status(400).json(getResponseErrorFormat(
                "You're not registerd. please contact admin!",
                CUSTOM_API_CODES.USER_NOT_REGISTERED,
            ));
        }
        return res.json(getResponseFormat());
    } catch (error) {
        return sendError(res, error);
    }
});

export default router;
