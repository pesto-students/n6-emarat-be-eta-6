import authRoutes from "./auth.js";
import uploadImage from "./uploadImage.js";

function routerInit(app) {
    uploadImage(app);
    app.use("/", authRoutes);

    app.use(function (req, res, next) {
        res.status(404).send("Not found");
    })

    app.use(function (err, req, res, next) {
        console.error(err.stack)
        res.status(500).send('Server Err')
    })

}

export default routerInit;
