import mongoose from 'mongoose';
const { Schema, model, models } = mongoose;

const LearnerOnboardingSchema = new Schema({
    // Learning Style & Preferences
    learningPreference: {
      type: String,
      enum: ["visual", "logical", "practical", "handsOn"],
      required: true,
    },
    difficultConceptApproach: {
      type: String,
      enum: ["breakDown", "discuss", "handsOn", "experiment"],
      required: true,
    },
    motivation: {
      type: String,
      enum: ["grades", "understanding", "application", "enjoyment"],
      required: true,
    }, 
    feedbackPreference: {
      type: String,
      enum: ["constructive", "positive", "exampleBased", "selfReflection"],
      required: true,
    },
    tutorWorkPreference: {
      type: String,
      enum: ["structured", "flexible", "handsOn", "independent"],
      required: true,
    },
    role: {
      type: String,
      enum: ["organizer", "ideaGenerator", "doer", "mediator"],
      required: true,
    },
    interests: {
      type: [String],
      required: true,
    },
    user : { type: Schema.Types.ObjectId, ref: 'User', required: true },
    
  });

export default models.LearnerOnboarding || model('LearnerOnboarding', LearnerOnboardingSchema);