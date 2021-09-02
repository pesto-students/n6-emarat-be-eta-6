import express from "express";
import { postLogin } from "../controllers/login.js";

const router = express.Router();

// router.get("/", (req, res, next) => {
// 	res.send("home");
// });

router.post("/login/", postLogin);

export default router;
