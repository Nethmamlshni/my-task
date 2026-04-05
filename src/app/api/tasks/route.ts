import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Task from "@/models/Task";

// GET all tasks
export async function GET() {
  await connectDB();
  const tasks = await Task.find().sort({ createdAt: -1 });
  return NextResponse.json(tasks);
}

// POST new task
export async function POST(req: Request) {
  await connectDB();
  const { title, date, time, description, status, completed } = await req.json();

  if (!title || !date || !time) {
    return NextResponse.json({ error: "Title, date, time required" }, { status: 400 });
  }

  const task = new Task({ title, date, time, description, status, completed });
  await task.save();

  return NextResponse.json(task, { status: 201 });
}