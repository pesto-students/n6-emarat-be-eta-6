import express from "express";
import { show } from "../controllers/homepage.js";
import admin from "../middleware/auth/admin.js";

const router = express.Router();

router.get("/", show);

export default router;
