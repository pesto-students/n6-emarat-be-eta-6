import authRoutes from "./auth.js";

function routerInit(app)
{
	app.use("/", authRoutes);

	app.use(function (req, res, next)
	{
		res.status(404).send("Not found");
	})

	app.use(function (err, req, res, next)
	{
		console.error(err.stack)
		res.status(500).send('Server Err')
	})
}

export default routerInit;
