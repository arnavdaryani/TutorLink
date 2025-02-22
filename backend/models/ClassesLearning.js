import mongoose from 'mongoose';
const { Schema, model, models } = mongoose;

const ClassesLearningSchema = new Schema({
  class: { type: String, required: true },
  sessionType: { type: String, required: true }, // group or singular
  budgetRange: { type: { min: Number, max: Number }, required: true }, // Student's budget range
  tutorPreferences: { type: [String], required: true },
  availability: { type: [String], required: true },
  learningGoals: { type: [String], required: true },
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true }, // Reference to the user who created this
});

export default models.ClassesLearning || model('ClassesLearning', ClassesLearningSchema);