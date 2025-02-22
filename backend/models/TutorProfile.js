import mongoose from 'mongoose';
const { Schema, model, models } = mongoose;

const TutorProfileSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  learningStyle: { type: String, required: true },
  locationPreference: { type: String, required: true },
  classesTaken: { type: [String], required: true },
  classesTeaching: { type: [String], required: true },
  hourlyRate: { type: Number, required: true },
  gradeLevel: { type: String, required: true },
  gpa: { type: Number },
  reviews: [{ type: Schema.Types.ObjectId, ref: "Review" }],
});

export default models.TutorProfile || model("TutorProfile", TutorProfileSchema);