import express from "express";
import { getResponseErrorFormat, getResponseFormat } from "../lib/utils.js";
const router = express.Router();
import { Broadcast, broadcastSchema } from '../models/broadcast.js';

router.post('/', async (req, res) => {
    const { body = {} } = req;
    const { id } = req.authUser;
    const { error } = broadcastSchema.validate(body);
    if (error) return res.status(400).send(getResponseErrorFormat(error.details[0].message, '400'));

    let broadcast = new Broadcast({ ...body, user: id });
    broadcast = await broadcast.save();
    res.send(getResponseFormat(broadcast, 'Broadcasted Succesfully'));
});

router.get('/', async (req, res) => {
    const { skip: reqSkip } = req.query;
    const skip = reqSkip && /^\d+$/.test(reqSkip) ? Number(reqSkip) : 0;

    const announcements = await (
        Broadcast
            .find()
            .populate('user')
            .sort({createdAt: -1})
            .skip(skip)
            .limit(5)
    );
    const resAnnouncements = announcements.map(amenity => {
        const { user = {}, picture, announcement, createdAt, title, _id } = amenity;
        const { firstName, lastName, picture: userPicture = '' } = user;
        return { picture, announcement, createdAt, title, user: `${firstName} ${lastName}`, userPicture, _id };
    })
    return res.send(getResponseFormat(resAnnouncements));
});

export default router;
