import mongoose from 'mongoose';
const { Schema, model, models } = mongoose;

const UserSchema = new Schema({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  avatarUrl: { type: String },
  createdAt: { type: Date, default: Date.now },
  classesLearning: [{ type: Schema.Types.ObjectId, ref: 'ClassesLearning', default: [] }],
  classesTaken: { type: [String], default: [] },
  classesTeaching: [{ type: Schema.Types.ObjectId, ref: 'ClassTeaching', default: [] }],
  bio: { type: String },
  preferredMeetingType: { type: String },
  locationPreference: { type: String },
  rating: { type: Number, default: 0 },
  isPurdue: { type: Boolean, default: false },
  gradeLevel: { type: String },
  isBanned: { type: Boolean, default: false },
});

export default models.User || model('User', UserSchema);