import express from "express";
import { getTutors, createTutor } from "../controllers/tutorProfileController";

const router = express.Router();
router.get("/", getTutors);
router.post("/", createTutor);

export default router;