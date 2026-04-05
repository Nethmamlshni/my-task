import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Note from "@/models/Note";

// ✅ DELETE note
export async function DELETE(
  req: Request,
  context: { params: Promise<{ id: string }> } // ✅ FIX
) {
  await connectDB();

  const { id } = await context.params; // ✅ MUST await

  const deletedNote = await Note.findByIdAndDelete(id);

  if (!deletedNote) {
    return NextResponse.json(
      { error: "Note not found" },
      { status: 404 }
    );
  }

  return NextResponse.json({ message: "Note deleted" });
}