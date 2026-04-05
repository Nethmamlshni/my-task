"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { FaPlus, FaTrash } from "react-icons/fa";
import Dashboard from "../../../components/navbar/page";
import Footer from "../../../components/footer/page";

interface Task {
  _id: string;
  title: string;
  date: string;
  time: string;
  description: string;
  status: "todo" | "inprogress" | "done";
}

export default function TaskManagerPage() {
  const [mounted, setMounted] = useState(false); // ✅ FIX hydration
  const [tasks, setTasks] = useState<Task[]>([]);
  const [showForm, setShowForm] = useState(false);

  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [description, setDescription] = useState("");
  const [searchDate, setSearchDate] = useState("");

  
  // ✅ Fix hydration issue
  useEffect(() => {
    setMounted(true);
  }, []);
  // Fetch tasks
  const fetchTasks = async () => {
    const res = await axios.get("/api/tasks");
    setTasks(res.data);
  };

  useEffect(() => {
    if (mounted) fetchTasks();
  }, [mounted]);

  // Add task
  const addTask = async () => {
    if (!title || !date || !time) {
      alert("Fill all fields");
      return;
    }

    await axios.post("/api/tasks", {
      title,
      date,
      time,
      description,
      status: "todo",
    });

    setTitle("");
    setDate("");
    setTime("");
    setDescription("");
    setShowForm(false);
    fetchTasks();
  };
 console.log(tasks);
  // Delete task
  const deleteTask = async (id: string) => {
    await axios.delete(`/api/tasks/${id}`);
    fetchTasks();
  };

  // ✅ Safe TODAY (client only)
  const today = new Date().toISOString().split("T")[0];

  // Filter tasks
  const filteredTasks = tasks.filter((t) => {
    const isToday = t.date === today;
    const searchMatch = searchDate ? t.date === searchDate : true;
    return t.status === "todo" && isToday && searchMatch;
  });

  // ✅ Prevent hydration mismatch render
  if (!mounted) return null;

  return (
    <div className="flex flex-col min-h-screen  bg-green-300 dark:bg-black transition-colors">
      <Dashboard />
   
    <div className="p-4 md:p-6 mb-40">
    <div className="flex flex-col items-center ">

  {/* Title */}
  <h1 className="text-2xl font-bold text-black mb-4 text-center mt-10">
    Today Tasks 🌿
  </h1>

  {/* 🔍 Search (CENTER) */}
  <div className="mb-6 w-full flex justify-center">
    <input
      type="date"
      value={searchDate}
      onChange={(e) => setSearchDate(e.target.value)}
      className="p-2 border rounded w-full max-w-xs shadow-sm"
    />
  </div>
  

      {/* ➕ Add Button */}
      <button
        onClick={() => setShowForm(!showForm)}
        className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded mb-4"
      >
        <FaPlus /> Add Task
      </button>

      {/* 📌 Form */}
      {showForm && (
        <div className="bg-white p-4 rounded shadow mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            <input
              type="text"
              placeholder="Task Name"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="p-2 border rounded"
            />
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="p-2 border rounded"
            />
            <input
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="p-2 border rounded"
            />
            <input
              type="text"
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="p-2 border rounded"
            />
          </div>

          <button
            onClick={addTask}
            className="mt-3 bg-green-600 text-white px-4 py-2 rounded"
          >
            Save Task
          </button>
        </div>
      )}
</div>
      {/* 🟩 Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {filteredTasks.length === 0 ? (
          <p className="text-gray-500 col-span-full text-center">
            No tasks for today
          </p>
        ) : (
          filteredTasks.map((task) => (
            <div
              key={task._id}
              className="bg-white p-4 rounded-xl shadow hover:shadow-lg transition flex flex-col justify-between"
            >
              <div>
                <h2 className="font-semibold text-green-700 mb-2">
                  {task.title}
                </h2>
                <p className="text-sm text-gray-600 mb-1">
                  {task.date}
                </p>
              </div>

              {/* Delete */}
              <div className="flex justify-end ">
                <FaTrash
                  className="text-red-500 cursor-pointer"
                  onClick={() => deleteTask(task._id)}
                />
              </div>
            </div>
          ))
        )}
      </div>
    </div>
    <Footer/>
    </div>

  );
}