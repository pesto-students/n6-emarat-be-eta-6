import express from "express";
import { loginOrRefreshToken } from "../controllers/login.js";
import user from "../middleware/auth/user.js";

const router = express.Router();

router.get("/login/", user, loginOrRefreshToken);
router.get("/refreshToken/", user, loginOrRefreshToken);

export default router;
