"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { FaTrash } from "react-icons/fa";
import Dashboard from "../../../components/navbar/page";
import Footer from "../../../components/footer/page";

const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

interface Item {
  _id: string;
  day: string;
  task: string;
  time: string;
  description: string;
}

export default function TimetablePage() {
  const [data, setData] = useState<Item[]>([]);

  // fetch data
  const fetchData = async () => {
    const res = await axios.get("/api/timetable");
    setData(res.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  // add task
  const addTask = async (day: string) => {
    const task = prompt(`Task name for ${day}`);
    const time = prompt("Enter time (e.g. 10:30 AM)");
    const description = prompt("Enter description");

    if (!task || !time || !description) return;

    await axios.post("/api/timetable", {
      day,
      task,
      time,
      description,
    });

    fetchData();
  };

  // delete task
  const deleteTask = async (id: string) => {
    await axios.delete(`/api/timetable/${id}`);
    fetchData();
  };

  // get tasks for a day
  const getTasksForDay = (day: string) => {
    return data.filter((d) => d.day === day);
  };

  return (
    <div className="bg-green-300 dark:bg-black transition-colors min-h-screen">
      <Dashboard />

      <div className="p-6">
        <h1 className="text-2xl font-bold text-center mb-6">
          Weekly Planner 📅
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-7 gap-4">
          {days.map((day) => {
            const tasks = getTasksForDay(day);

            return (
              <div
                key={day}
                className="bg-white dark:bg-gray-900 p-4 rounded-xl shadow flex flex-col"
              >
                {/* Day Header */}
                <h2 className="text-lg font-semibold text-center mb-3">
                  {day}
                </h2>

                {/* Tasks */}
                <div className="flex flex-col gap-3 flex-grow">
                  {tasks.length > 0 ? (
                    tasks.map((item) => (
                      <div
                        key={item._id}
                        className="bg-green-200 dark:bg-gray-700 p-3 rounded-lg relative"
                      >
                        <p className="font-semibold">{item.task}</p>
                        <p className="text-sm text-gray-700 dark:text-gray-300">
                          🕒 {item.time}
                        </p>
                        <p className="text-xs text-gray-600 dark:text-gray-400">
                          {item.description}
                        </p>

                        <FaTrash
                          className="text-red-500 absolute top-2 right-2 cursor-pointer"
                          onClick={() => deleteTask(item._id)}
                        />
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-400 text-sm text-center">
                      No tasks
                    </p>
                  )}
                </div>

                {/* Add Button */}
                <button
                  onClick={() => addTask(day)}
                  className="mt-4 bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
                >
                  + Add Task
                </button>
              </div>
            );
          })}
        </div>
      </div>

      <Footer />
    </div>
  );
}