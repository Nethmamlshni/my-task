import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Timetable from "@/models/Timetable";

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }   // 👈 params is a Promise
) {
  try {
    await connectDB();

    const { id } = await params;   // 👈 FIX HERE

    await Timetable.findByIdAndDelete(id);

    return NextResponse.json({ message: "Deleted successfully" });
  } catch (error) {
    return NextResponse.json({ error: "Delete failed" }, { status: 500 });
  }
}