import TutorProfile from "../models/TutorProfile";

export const getTutors = async (req, res) => {
  try {
    const tutors = await TutorProfile.find().populate("reviews");
    res.status(200).json(tutors);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createTutor = async (req, res) => {
  try {
    const tutor = new TutorProfile(req.body);
    await tutor.save();
    res.status(201).json(tutor);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};