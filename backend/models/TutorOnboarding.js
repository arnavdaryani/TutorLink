import mongoose from "mongoose";
const { Schema, model, models } = mongoose;

const TutorOnboardingSchema = new Schema({
    teachingMethod: {
        type: String,
        enum: ["visual", "logical", "practical", "handsOn"],
        required: true,
      },
      strugglingStudentApproach: {
        type: String,
        enum: ["breakDown", "discuss", "handsOn", "approaches"],
        required: true,
      },
      learningStyleHandling: {
        type: String,
        enum: ["grades", "understanding", "application", "enjoyment"],
        required: true,
      },
      feedbackPhilosophy: {
        type: String,
        enum: ["constructive", "positive", "exampleBased", "selfReflection"],
        required: true,
      },
      sessionStructure: {
        type: String,
        enum: ["structured", "flexible", "handsOn", "independent"],
        required: true,
      },
      role : {
        type: String,
        enum: ["organizer", "ideaGenerator", "doer", "mediator"],
        required: true,
      },
      interests: {
        type: [String],
        required: true,
      },
      user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    });

export default models.TutorOnboarding || model("TutorOnboarding", TutorOnboardingSchema);