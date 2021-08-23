import express from "express";
import { postLogin } from "../controllers/login.js";
import { getRegister, postRegister } from "../controllers/register.js";

const router = express.Router();

router.get("/", (req, res, next) => {
	res.send("home");
});

router.post("/login/", postLogin);

router.get("/register", getRegister);
router.post("/register", postRegister);

// router.delete('/:id', deleteUser);

export default router;
