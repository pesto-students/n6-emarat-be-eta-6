// Users Routes
import express from "express";
import { getResponseErrorFormat } from "../lib/utils.js";
const router = express.Router();
import { User, joiSchema } from '../models/user.js';

router.post('/', async (req, res) => {
    const { error } = joiSchema.validate(req.body);
    if (error) return res.status(400).send(getResponseErrorFormat(error.details[0].message, '400'));

    let user = await User.findOne({ phone: req.body.phone });
    if (user) return res.status(400).send(getResponseErrorFormat('Phone already exists', '400'));

    user = new User(req.body);
    user = await user.save();
    res.send(user);
});

router.get('/', async (req, res) => {
    if (!req.query.phone) return res.send(await User.find());

    const user = await User.findOne({ phone: req.query.phone });
    if (!user) return res.status(404).send(getResponseErrorFormat('User with requested phone not found', '400'));
    res.send(user);
});

router.get('/:id', async (req, res) => {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).send(getResponseErrorFormat('User with requested Id not found', '400'));

    res.send(user);
});

router.put('/:id', async (req, res) => {
    let user = await User.findById(req.params.id);
    if (!user) return res.status(404).send(getResponseErrorFormat('User with requested Id not found', '400'));

    const { error } = joiSchema.validate(req.body);
    if (error) return res.status(400).send(getResponseErrorFormat(error.details[0].message, '400'));

    for (let key in req.body) {
        user[key] = req.body[key]
    }
    user = await user.save();
    res.send(user);
});

router.put('/', async (req, res) => {
    if (!req.query.phone) return res.status(400).send('Send phone in query parameter');

    let user = await User.findOne({ phone: req.query.phone });
    if (!user) return res.status(404).send('User with requested phone not found');

    const { error } = joiSchema.validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    for (let key in req.body) {
        user[key] = req.body[key]
    }
    user = await user.save();
    res.send(user);
});

router.delete('/', async (req, res) => {
    if (!req.query.phone) return res.send(await User.find());

    const user = await User.findOneAndDelete({ phone: req.query.phone });
    if (!user) return res.status(404).send('User with requested phone not found');
    res.send(user);
});

router.delete('/:id', async (req, res) => {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).send('User with requested Id not found');
    res.send(user);
});

export default router;
