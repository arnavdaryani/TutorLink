import mongoose from 'mongoose';
const { Schema, model, models } = mongoose;

const MatchSchema = new Schema({
    student: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    tutor: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    compatibilityScore: { type: Number, required: true }, // ML-generated score (0-100)
    matchedAt: { type: Date, default: Date.now },
    student_status: { type: String, enum: ['none', 'pending', 'accepted', 'rejected'], default: 'none' },
    tutor_status: { type: String, enum: ['none', 'accepted', 'rejected'], default: 'none' },
  });

export default models.Matched || model('Matched', MatchSchema);