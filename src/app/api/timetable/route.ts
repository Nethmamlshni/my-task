import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Timetable from "@/models/Timetable";

// ✅ GET ALL TASKS
export async function GET() {
  try {
    await connectDB();

    const data = await Timetable.find().sort({ createdAt: -1 });

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch" }, { status: 500 });
  }
}

// ✅ CREATE TASK
export async function POST(req: Request) {
  try {
    await connectDB();

    const body = await req.json();

    const newTask = await Timetable.create({
      day: body.day,
      task: body.task,
      time: body.time,
      description: body.description,
    });
     console.log("New Task Created:", newTask); // Debug log
     console.log("time:", body.time); // Debug log  
    return NextResponse.json(newTask);
  } catch (error) {
    return NextResponse.json({ error: "Failed to create" }, { status: 500 });
  }
}