import mongoose from 'mongoose';
import User from "../models/user.js";

export const getRegister = (req, res) =>
{
	res.render('guests/register');
}

export const postRegister = async (req, res) =>
{
	const user = req.body;

	const newUser = new User(user);

	try
	{
		await newUser.save();

		res.status(201).json(newUser);
	}
	catch (error)
	{
		res.status(409).json({ message: error.message });
	}
}
