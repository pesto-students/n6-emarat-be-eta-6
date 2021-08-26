export const sendError = (res, error) => {
	if (!res.headersSent) res.status(409).json({ message: error.message });
};
