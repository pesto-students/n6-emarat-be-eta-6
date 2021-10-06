import express from "express";
import { loginOrRefreshToken, mockLogin } from "../controllers/login.js";
import user from "../middleware/auth/user.js";

const router = express.Router();

router.get("/login/", user, loginOrRefreshToken);
router.get("/refreshToken/", user, loginOrRefreshToken);
router.post('/mockLogin', mockLogin);

export default router;
