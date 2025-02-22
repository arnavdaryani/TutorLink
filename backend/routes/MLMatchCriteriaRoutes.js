import express from "express";
import { getMLMatches, createMLMatch } from "../controllers/MLMatchCriteriaController";

const router = express.Router();
router.get("/", getMLMatches);
router.post("/", createMLMatch);

export default router;