import express from "express";
import { index, store, show, update, destroy } from "../controllers/amenity.js";
import admin from "../middleware/auth/admin.js";
import resident from "../middleware/auth/resident.js";

const router = express.Router();

router.get("/", index);

router.post("/", admin, store);

router.get("/:id", show);
router.put("/:id", admin, update);
router.delete("/:id", admin, destroy);

export default router;
