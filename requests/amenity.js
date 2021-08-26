import Joi from "joi";
import { joiValidator } from "../helpers/joi.js";

const schema = Joi.object({
	name: Joi.string().min(2).max(100).required(),
	description: Joi.string().min(5).max(500).required(),
	fee: Joi.number().integer().min(0).max(9999).required(),
	icon: Joi.string().min(5).max(200).required(),
	createdAt: Joi.date(),
});

export default (req, res) => joiValidator(schema, req.body, res);
