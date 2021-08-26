export const joiValidator = (schema, body, res) => {
	const { error, value } = schema.validate(body);

	if (error) res.status(400).json(error.details[0].message);

	return value;
};
