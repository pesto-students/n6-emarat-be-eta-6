import { getResponseErrorFormat } from "../../lib/utils.js";

export default async function (req, res, next) {
    let token = req.headers.authorization;
    if (token) return res.status(403).send(getResponseErrorFormat('Access Denied.', 403));
    next();
}