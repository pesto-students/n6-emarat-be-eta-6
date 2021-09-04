import express from "express";
import { postLogin } from "../controllers/login.js";
import user from "../middleware/auth/user.js";

const router = express.Router();

router.post("/login/", user, postLogin);

export default router;
