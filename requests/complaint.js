import Joi from "joi";
import { joiValidator, objectId } from "../helpers/joi.js";

const createSchema = Joi.object({
	amenityId: objectId(),
	description: Joi.string().min(2).max(2000).required(),
});

export const validateCreate = (req, res) =>
	joiValidator(createSchema, req.body, res);

const updateSchema = Joi.object({
	status: Joi.string().valid("raised", "progress", "rejected", "resolved"),
	comment: Joi.string().min(2).max(2000),
});

export const validateUpdate = (req, res) =>
	joiValidator(updateSchema, req.body, res);
