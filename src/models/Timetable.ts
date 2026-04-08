import mongoose, { Schema, Document } from "mongoose";

export interface ITimetable extends Document {
  day: string;
  task: string;
  time: string;
  description: string;
}

const TimetableSchema: Schema = new Schema(
  {
    day: { type: String, required: true },
    task: { type: String, required: true },
    time: { type: String, required: true },        // ✅ MUST EXIST
    description: { type: String, required: true }, // ✅ MUST EXIST
  },
  { timestamps: true }
);

export default mongoose.models.Timetable ||
  mongoose.model<ITimetable>("Timetable", TimetableSchema);