import mongoose from 'mongoose';
const { Schema, model, models } = mongoose;

const NotificationSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true }, // Recipient of the notification
    message: { type: String, required: true }, // Notification message
    type: { type: String, enum: ['match', 'session', 'payment', 'review'], required: true }, // Notification type
    isRead: { type: Boolean, default: false }, // Whether the notification has been read
    createdAt: { type: Date, default: Date.now },
  });

export default models.Notification || model('Notification', NotificationSchema);