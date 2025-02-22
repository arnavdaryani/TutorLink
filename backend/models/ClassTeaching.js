import mongoose from 'mongoose';
const { Schema, model, models } = mongoose;

const ClassTeachingSchema = new Schema({
  class: { type: String, required: true },
  sessionType: { type: String, required: true },
  experience: { type: String, required: true },
  availability: { type: [String], required: true },
  studentPreferences: { type: [String], required: true },
  classesTeaching: { type: [String], required: true },
  hourlyRate: { type: Number, required: true },
  reviews: [{ type: Schema.Types.ObjectId, ref: 'Review' }],
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true }, // Reference to the user who created this
});

export default models.ClassTeaching || model('ClassTeaching', ClassTeachingSchema);