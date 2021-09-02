import express from "express";
import { index } from "../controllers/dashboard.js";
import { shouldBeLoggedIn } from "../middleware/auth.js";

const router = express.Router();

router.get("/", index);
// router.get("/", shouldBeResident, store);

export default router;
