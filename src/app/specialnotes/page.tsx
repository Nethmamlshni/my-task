"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { FaPlus, FaTrash } from "react-icons/fa";
import Dashboard from "../../../components/navbar/page";
import Footer from "../../../components/footer/page";

interface Note {
  _id: string;
  title: string;
  description: string;
  date: string;
}

export default function SpecialNotesPage() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [showForm, setShowForm] = useState(false);

  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");

  // Fetch notes
  const fetchNotes = async () => {
    const res = await axios.get("/api/specialnotes");
    setNotes(res.data);
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  // Add note
  const addNote = async () => {
    if (!title || !date) {
      alert("Fill title & date");
      return;
    }

    await axios.post("/api/specialnotes", {
      title,
      description,
      date,
    });

    setTitle("");
    setDate("");
    setDescription("");
    setShowForm(false);
    fetchNotes();
  };

  // Delete note
  const deleteNote = async (id: string) => {
    await axios.delete(`/api/specialnotes/${id}`);
    fetchNotes();
  };

  return (
    <div className=" bg-green-300 mb-40 dark:bg-black transition-colors ">
      <Dashboard />
    <div className="p-6 bg-green-300 mb-40 dark:bg-black transition-colors ">
      
      {/* Title */}
      <h1 className="text-2xl font-bold text-green-600 text-center ">
        Special Notes 🌟
      </h1>

      {/* Add Button */}
      <div className="flex justify-center mb-4">
        <button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded"
        >
          <FaPlus /> Add Note
        </button>
      </div>

      {/* Form */}
      {showForm && (
        <div className="bg-white p-4 rounded shadow max-w-xl mx-auto mb-6">
          <input
            type="text"
            placeholder="Note Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full mb-2 p-2 border rounded"
          />

          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full mb-2 p-2 border rounded"
          />

          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full mb-2 p-2 border rounded"
          />

          <button
            onClick={addNote}
            className="bg-green-600 text-white px-4 py-2 rounded"
          >
            Save Note
          </button>
        </div>
      )}

      {/* Notes Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {notes.length === 0 ? (
          <p className="text-center col-span-full text-gray-500">
            No notes yet
          </p>
        ) : (
          notes.map((note) => (
            <div
              key={note._id}
              className="bg-yellow-200 p-4 rounded-lg shadow relative hover:scale-105 transition"
            >
              {/* Delete */}
              <FaTrash
                className="absolute top-2 right-2 text-red-500 cursor-pointer"
                onClick={() => deleteNote(note._id)}
              />

              <h2 className="font-bold text-lg mb-2">
                {note.title}
              </h2>

              <p className="text-sm text-gray-600 mb-2">
                📅 {note.date}
              </p>

              <p className="text-sm text-gray-700">
                {note.description}
              </p>
            </div>
          ))
        )}
      </div>
     
    </div>
     <Footer />
    </div>
  );
}