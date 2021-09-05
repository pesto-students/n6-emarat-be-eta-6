import Joi from "joi";

export const joiValidator = (schema, body, res) => {
	const { error, value } = schema.validate(body, { stripUnknown: true });

	if (error) {
		res.status(400).json(error.details[0].message);
		return false;
	}

	return value;
};

export const objectId = (required = true) => {
	let rules = Joi.string().alphanum().length(24);

	if (required) rules = rules.required();

	return rules;
};
