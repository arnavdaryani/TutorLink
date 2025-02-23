import mongoose from 'mongoose';
const { Schema, model, models } = mongoose;

const SessionSchema = new Schema({
  // there could be multiple students in a group session
  students: [{ type: Schema.Types.ObjectId, ref: 'User', default: [] }],
  tutor: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  class: { type: String, required: true },
  sessionType: { type: String, enum: ['one-on-one', 'group'], required: true },
  scheduledAt: { type: Date, required: true }, // Date and time of the session
  duration: { type: Number, required: true }, // Duration in minutes
  price: { type: Number, required: true }, // Price of the session
  createdAt: { type: Date, default: Date.now },
});

export default models.Session || model('Session', SessionSchema);