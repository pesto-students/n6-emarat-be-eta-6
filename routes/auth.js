import express from "express";
import { postLogin } from "../controllers/login.js";
import guest from "../middleware/auth/guest.js";

const router = express.Router();

// router.get("/", (req, res, next) => {
// 	res.send("home");
// });

router.post("/login/", guest, postLogin);

export default router;
