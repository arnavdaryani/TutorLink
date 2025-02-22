import mongoose from 'mongoose';
const { Schema, model, models } = mongoose;

const StudentProfileSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  learningStyle: { type: String, required: true },
  locationPreference: { type: String, required: true },
  availability: { type: [String], required: true },
  gradeLevel: { type: String, required: true },
  learningGoals: { type: [String], required: true },
  targetClasses: { type: [String], required: true },
  preferredMeetingType: { type: String, required: true },
});

export default models.StudentProfile || model("StudentProfile", StudentProfileSchema);