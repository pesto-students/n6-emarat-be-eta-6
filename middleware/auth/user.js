import { verifyToken } from "../../config/firebaseAuth.js";
import { getResponseErrorFormat } from "../../lib/utils.js";

export default async function (req, res, next) {
    let token = req.headers.authorization;
    if (!token) return res.status(401).send(getResponseErrorFormat('Access denied. No token provided', 401));
    token = token.split(' ')[1];

    try {
        const decodedToken = await verifyToken(token);
        req.user = {
            id: decodedToken.uniqueId,
            isAdmin: decodedToken.isAdmin,
        };
        next();
    } catch (ex) {
        res.status(400).send(getResponseErrorFormat('Invalid Token', 400));
    }
};
