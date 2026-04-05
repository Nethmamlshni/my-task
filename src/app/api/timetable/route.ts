import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Timetable from "@/models/Timetable";

// GET all timetable data
export async function GET() {
  await connectDB();
  const data = await Timetable.find();
  return NextResponse.json(data);
}

// POST (add task)
export async function POST(req: Request) {
  await connectDB();
  const body = await req.json();

  const newItem = await Timetable.create(body);

  return NextResponse.json(newItem, { status: 201 });
}