import express from "express";
import { index, store, edit, update, destroy } from "../controllers/amenity.js";

const router = express.Router();

router.get("/", index);

router.post("/", store);

router.get("/:id/edit", edit);

router.put("/:id", update);
router.delete("/:id", destroy);

export default router;
