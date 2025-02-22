import StudentProfile from "../models/StudentProfile";

export const getStudents = async (req, res) => {
  try {
    const students = await StudentProfile.find();
    res.status(200).json(students);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createStudent = async (req, res) => {
  try {
    const student = new StudentProfile(req.body);
    await student.save();
    res.status(201).json(student);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};