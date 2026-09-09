import mongoose, { Schema, model, models } from "mongoose";

export interface ISubscriber {
  email: string;
  createdAt: Date;
}

const SubscriberSchema = new Schema<ISubscriber>(
  {
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      unique: true,
    },
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

export const Subscriber =
  (models.Subscriber as mongoose.Model<ISubscriber>) ||
  model<ISubscriber>("Subscriber", SubscriberSchema);
