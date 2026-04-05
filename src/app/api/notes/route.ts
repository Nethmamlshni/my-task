import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Note from "@/models/Note";

// ✅ GET all notes
export async function GET() {
  await connectDB();

  const notes = await Note.find().sort({ createdAt: -1 });

  return NextResponse.json(notes);
}

// ✅ POST new note
export async function POST(req: Request) {
  await connectDB();

  const { title, date, description } = await req.json();

  if (!title || !date) {
    return NextResponse.json(
      { error: "Title and Date required" },
      { status: 400 }
    );
  }

  const newNote = new Note({ title, date, description });

  await newNote.save();

  return NextResponse.json(newNote, { status: 201 });
}