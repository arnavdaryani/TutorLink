const { Schema, model, models } = mongoose;

const ReviewSchema = new Schema({
  rating: { type: Number, required: true },
  comment: { type: String },
  createdAt: { type: Date, default: Date.now },
});

export default models.Review || model("Review", ReviewSchema);