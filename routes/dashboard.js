import express from "express";
import { show } from "../controllers/dashboard.js";
import { shouldBeAdmin } from "../middleware/auth.js";

const router = express.Router();

router.get("/", shouldBeAdmin, show);

export default router;
