import { getResponseErrorFormat } from "../lib/utils.js";

export default async function (req, res, next) {
    if (!(req.user.isAdmin)) return res.status(403).send(getResponseErrorFormat('Access Denied.', 403));
    next();
}
