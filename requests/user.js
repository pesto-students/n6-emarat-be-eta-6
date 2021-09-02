import Joi from "joi";
import { joiValidator } from "../helpers/joi.js";

const schema = Joi.object({
	isAdmin: Joi.bool(),
	firstName: Joi.string().min(1).max(50).required(),
	lastName: Joi.string().min(1).max(50).required(),
	phone: Joi.string().length(10).regex(/^\d+$/).required(),
	flat: Joi.string(),
	picture: Joi.alternatives([
		Joi.string().min(5).max(200),
		Joi.string().valid("").strip(),
	]),
});

export default (req, res) => joiValidator(schema, req.body, res);
