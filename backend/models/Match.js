import mongoose from 'mongoose';
const { Schema, model, models } = mongoose;

const MatchSchema = new Schema({
    student: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    tutor: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    compatibilityScore: { type: Number, required: true }, // ML-generated score (0-100)
    matchedAt: { type: Date, default: Date.now },
    status: { type: String, enum: ['pending', 'accepted', 'rejected'], default: 'pending' },
  });

export default models.Matched || model('Matched', MatchSchema);