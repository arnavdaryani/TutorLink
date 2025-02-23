import express from "express";
import { getTutorRecommendations } from "../services/recommendationService.js";

const router = express.Router();

// Route for tutor recommendations with studentId as a parameter
router.get("/:studentId", async (req, res) => {
  try {
    const { studentId } = req.params; // Correctly extract studentId from URL
    console.log("Fetching tutor recommendations for student:", studentId);
    
    const recommendations = await getTutorRecommendations(studentId);

    res.json({ success: true, tutors: recommendations });
  } catch (error) {
    console.error("Error fetching tutor recommendations:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

export default router;
