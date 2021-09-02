export const cacheComplaints = async () => {
	// redis.set("name", "haris");

	// count: {
	// 	raised: 1,
	// 	resolved: 1,
	// 	progress: 1,
	// 	rejected: 1,
	// },
	// byPeriod: [
	// 	{
	// 		month: 1;
	// 		year: 2021;
	// 		raised: 1,
	// 		resolved: 1,
	// 		progress: 1,
	// 		rejected: 1,
	// 	}
	// ]

	// const keys = await redis.keys("*");

	// res.json(keys);

	// redis.set("name", "blah");

	// redis.get("name").then(function (result) {
	// 	// console.log(result); // Prints "bar"
	// 	res.json(result);
	// });

	console.log("complaints cache miss");
};
