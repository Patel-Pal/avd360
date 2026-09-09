import mongoose, { Schema, model, models } from "mongoose";
import { serviceOptions } from "@/lib/validation";

export interface IContact {
  name: string;
  email: string;
  phone: string;
  company?: string;
  service: (typeof serviceOptions)[number];
  message: string;
  createdAt: Date;
}

const ContactSchema = new Schema<IContact>(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    phone: { type: String, required: true, trim: true },
    company: { type: String, trim: true, default: "" },
    service: {
      type: String,
      required: true,
      enum: serviceOptions as unknown as string[],
    },
    message: { type: String, required: true, trim: true },
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

export const Contact =
  (models.Contact as mongoose.Model<IContact>) ||
  model<IContact>("Contact", ContactSchema);
