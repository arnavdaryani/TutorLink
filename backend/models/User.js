import mongoose from 'mongoose';
const { Schema, model, models } = mongoose;

const UserSchema = new Schema({
  email: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  role: { type: String, enum: ["student", "tutor"], required: true },
  avatarUrl: { type: String },
  createdAt: { type: Date, default: Date.now },
});

export default models.User || model("User", UserSchema);