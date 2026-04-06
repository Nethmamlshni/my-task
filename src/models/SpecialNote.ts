import mongoose, { Schema, models, model } from "mongoose";

const SpecialNoteSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      default: "",
      trim: true,
    },
    date: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true, // createdAt + updatedAt
  }
);

// Prevent model overwrite error in Next.js
const SpecialNote =
  models.SpecialNote || model("SpecialNote", SpecialNoteSchema);

export default SpecialNote;