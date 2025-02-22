import mongoose from 'mongoose';
const { Schema, model, models } = mongoose;

const SessionSchema = new Schema({
  tutorId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  studentId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  date: { type: Date, required: true },
  duration: { type: Number, required: true },
  course: { type: String, required: true },
  meetingType: { type: String, required: true },
  status: { type: String, required: true },
});

export default models.Session || model("Session", SessionSchema);