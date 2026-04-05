import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Timetable from "@/models/Timetable";

// DELETE task
export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  await connectDB();

  const { id } = await params; // ✅ FIX (IMPORTANT)

  await Timetable.findByIdAndDelete(id);

  return NextResponse.json({ message: "Deleted" });
}