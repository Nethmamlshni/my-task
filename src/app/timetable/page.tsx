"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { FaTrash } from "react-icons/fa";
import Dashboard from "../../../components/navbar/page";
import Footer from "../../../components/footer/page";

const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

// 6 AM → 12 PM night
const hours = Array.from({ length: 18 }, (_, i) => {
  const hour = i + 6;
  return `${hour.toString().padStart(2, "0")}:00`;
});

interface Item {
  _id: string;
  day: string;
  hour: string;
  task: string;
}

export default function TimetablePage() {
  const [data, setData] = useState<Item[]>([]);

  // fetch
  const fetchData = async () => {
    const res = await axios.get("/api/timetable");
    setData(res.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  // add task
  const addTask = async (day: string, hour: string) => {
    const task = prompt(`Add task for ${day} ${hour}`);

    if (!task) return;

    await axios.post("/api/timetable", {
      day,
      hour,
      task,
    });

    fetchData();
  };

  // delete task
  const deleteTask = async (id: string) => {
    await axios.delete(`/api/timetable/${id}`);
    fetchData();
  };

  // find task
  const getTask = (day: string, hour: string) => {
    return data.find((d) => d.day === day && d.hour === hour);
  };

  return (
    <div className="bg-green-300 dark:bg-black transition-colors">
      <Dashboard />
        <div className="mb-40 p-4 bg-green-300 dark:bg-black transition-colors overflow-x-auto">
      <h1 className="text-2xl font-bold text-black-600 mb-4 text-center pt-10">
        Weekly Timetable 📅
      </h1>

      <div className="overflow-auto">
        <table className="min-w-full border border-gray-300 bg-white rounded-xl shadow">
          
          {/* Header */}
          <thead>
            <tr>
              <th className="border p-2 bg-green-200">Time</th>
              {days.map((day) => (
                <th key={day} className="border p-2 bg-green-200">
                  {day}
                </th>
              ))}
            </tr>
          </thead>

          {/* Body */}
          <tbody>
            {hours.map((hour) => (
              <tr key={hour}>
                
                {/* Hour */}
                <td className="border p-2 font-semibold bg-gray-100">
                  {hour}
                </td>

                {/* Days */}
                {days.map((day) => {
                  const item = getTask(day, hour);

                  return (
                    <td
                      key={day}
                      className="border p-2 h-10 cursor-pointer hover:bg-green-100 relative"
                      onClick={() => !item && addTask(day, hour)}
                    >
                      {item ? (
                        <div className="bg-green-200 p-2 rounded relative h-full flex flex-col justify-between">
                          <span className="text-sm font-semibold">
                            {item.task}
                          </span>

                          <FaTrash
                            className="text-red-500 cursor-pointer self-end"
                            onClick={(e) => {
                              e.stopPropagation();
                              deleteTask(item._id);
                            }}
                          />
                        </div>
                      ) : (
                        <span className="text-gray-300 text-xs">
                          Click to add
                        </span>
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>

        </table>
      </div>

      
         </div>
         <Footer />
    </div>
  );
}