import mongoose from 'mongoose';
const { Schema, model, models } = mongoose;

const UserSchema = new Schema({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  avatarUrl: { type: String },
  createdAt: { type: Date, default: Date.now },
  isPurdue: { type: Boolean, default: false },
  major: { type: String },
  gradeLevel: { type: String },
  classesTaken: { type: [String], default: [] },
  classesLearning: [{ type: Schema.Types.ObjectId, ref: 'ClassesLearning', default: [] }],
  classesTeaching: [{ type: Schema.Types.ObjectId, ref: 'ClassTeaching', default: [] }],
  preferredMeetingType: { type: String },
  locationPreference: { type: String },
  bio: { type: String },
  rating: { type: Number, default: 0 },
  isTutor: { type: Boolean, default: false },
  isBanned: { type: Boolean, default: false },
  learnerOnboarding: { type: Schema.Types.ObjectId, ref: 'LearnerOnboarding' },
  tutorOnboarding: { type: Schema.Types.ObjectId, ref: 'TutorOnboarding' },
});

export default models.User || model('User', UserSchema);