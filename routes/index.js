import httpError from "../middleware/httpError.js";
import morganMiddleware from "../middleware/morganMiddleware.js";
import authRoutes from "./auth.js";
import uploadImage from "./uploadImage.js";

function routerInit(app) {
    app.use(morganMiddleware)

    uploadImage(app);
    app.use("/", authRoutes);

    app.use(function (req, res, next) {
        res.status(404).send("Not found");
    })
    app.use(httpError);
}

export default routerInit;
