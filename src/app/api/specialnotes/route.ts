import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import SpecialNote from "@/models/SpecialNote";

// GET all notes
export async function GET() {
  await connectDB();
  const notes = await SpecialNote.find().sort({ createdAt: -1 });
  return NextResponse.json(notes);
}

// POST new note
export async function POST(req: Request) {
  await connectDB();
  const { title, description, date } = await req.json();

  if (!title || !date) {
    return NextResponse.json(
      { error: "Title and date required" },
      { status: 400 }
    );
  }

  const note = new SpecialNote({ title, description, date });
  await note.save();

  return NextResponse.json(note, { status: 201 });
}