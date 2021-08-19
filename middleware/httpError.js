import Logger from "../lib/logging.js";
import { getResponseErrorFormat } from "../lib/utils.js";

export default (err, req, res, next) => {
    Logger.error(err.message, err);
    res.status(500).send(getResponseErrorFormat());
};
