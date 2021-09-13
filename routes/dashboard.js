import express from "express";
import { show } from "../controllers/dashboard.js";
import admin from "../middleware/auth/admin.js";

const router = express.Router();

router.get("/", admin, show);

export default router;
