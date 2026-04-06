import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import SpecialNote from "@/models/SpecialNote";

// DELETE note
export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  await connectDB();

  const { id } = await params;

  const deleted = await SpecialNote.findByIdAndDelete(id);

  if (!deleted) {
    return NextResponse.json(
      { error: "Note not found" },
      { status: 404 }
    );
  }

  return NextResponse.json({ message: "Deleted" });
}