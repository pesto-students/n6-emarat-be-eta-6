import express from "express";
import {
	index,
	store,
	show,
	update,
	destroy,
} from "../controllers/complaint.js";
import {
	shouldBeLoggedIn,
	shouldBeResident,
	shouldBeAdmin,
} from "../middleware/auth.js";

const router = express.Router();

router.get("/", shouldBeLoggedIn, index);

router.post("/", shouldBeResident, store);

router.get("/:id", shouldBeLoggedIn, show);
router.put("/:id", shouldBeAdmin, update);
router.delete("/:id", shouldBeAdmin, destroy);

export default router;
