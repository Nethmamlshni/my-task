import mongoose from "mongoose";

const TimetableSchema = new mongoose.Schema(
  {
    day: String,     // Monday, Tuesday...
    hour: String,    // 06:00, 07:00...
    task: String,    // Task name
  },
  { timestamps: true }
);

export default mongoose.models.Timetable ||
  mongoose.model("Timetable", TimetableSchema);