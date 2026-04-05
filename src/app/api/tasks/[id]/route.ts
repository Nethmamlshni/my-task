import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Task from "@/models/Task";

// ✅ DELETE → Delete task
export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  await connectDB();

  // ✅ FIX: unwrap params
  const { id } = await params;

  const deletedTask = await Task.findByIdAndDelete(id);

  if (!deletedTask) {
    return NextResponse.json(
      { error: "Task not found" },
      { status: 404 }
    );
  }

  return NextResponse.json({ message: "Task deleted" });
}

// ✅ PUT → Update task
export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  await connectDB();

  // ✅ FIX
  const { id } = await params;

  const body = await req.json();

  const updatedTask = await Task.findByIdAndUpdate(id, body, { new: true });

  if (!updatedTask) {
    return NextResponse.json(
      { error: "Task not found" },
      { status: 404 }
    );
  }

  return NextResponse.json(updatedTask);
}