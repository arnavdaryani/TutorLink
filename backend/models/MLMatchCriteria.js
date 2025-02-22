import mongoose from 'mongoose';
const { Schema, model, models } = mongoose;

const MLMatchCriteriaSchema = new Schema({
  studentLearningStyle: { type: String, required: true },
  targetClass: { type: String, required: true },
  studentAvailability: { type: [String], required: true },
  tutorGpa: { type: Number },
});

export default models.MLMatchCriteria || model("MLMatchCriteria", MLMatchCriteriaSchema);