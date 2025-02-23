import mongoose from "mongoose";
import User from "../models/User.js";
import LearnerOnboarding from "../models/LearnerOnboarding.js";
import TutorOnboarding from "../models/tutorOnboarding.js";

const jaccardSimilarity = (setA, setB) => {
  const intersection = setA.filter((value) => setB.includes(value)).length;
  const union = new Set([...setA, ...setB]).size;
  return union === 0 ? 0 : intersection / union;
};

const computeMatchScore = (student, tutor) => {
  let score = 0;
  
  if (student.preferredMeetingType === tutor.preferredMeetingType) score += 1;
  if (student.locationPreference === tutor.locationPreference) score += 1;
  if (student.difficultConceptApproach === tutor.strugglingStudentApproach) score += 1;
  if (student.feedbackPreference === tutor.feedbackPhilosophy) score += 1;
  if (student.tutorWorkPreference === tutor.sessionStructure) score += 1;
  if (student.role === tutor.role) score += 1;
  const studentInterests = student.interests || [];
  const tutorInterests = tutor.interests || [];
  
  score += jaccardSimilarity(studentInterests, tutorInterests) * 5;

  console.log(score);

  return score;
};

// Get top tutor matches for a student
const getTutorRecommendations = async (studentId) => {
  console.log("here1");

  const student = await User.findById(studentId).populate("learnerOnboarding");

  if (!student) return { success: false, tutors: [] };

  const tutors = await User.find({ isTutor: true }).populate("tutorOnboarding");
  console.log(tutors);

  const matches = tutors
    .filter((tutor) => tutor._id.toString() !== studentId) 
    .map((tutor) => ({
      tutorId: tutor._id,  
      score: computeMatchScore(student, tutor),
    }));

  return { success: true, tutors: matches.sort((a, b) => b.score - a.score) };
};

export { getTutorRecommendations };
