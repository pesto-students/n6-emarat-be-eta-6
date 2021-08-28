import express from "express";
import { getResponseErrorFormat, getResponseFormat } from "../lib/utils.js";
const router = express.Router();
import { Broadcast, broadcastSchema } from '../models/broadcast.js';

router.post('/', async (req, res) => {
    const { body = {} } = req;
    const { error } = broadcastSchema.validate(body);
    if (error) return res.status(400).send(getResponseErrorFormat(error.details[0].message, '400'));

    let broadcast = new Broadcast(body);
    broadcast = await broadcast.save();
    res.send(getResponseFormat(broadcast, 'Broadcasted Succesfully'));
});

router.get('/', async (req, res) => {
    const announcements = await Broadcast.find();
    return res.send(announcements);
});

export default router;
