"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { FaPlus, FaTrash } from "react-icons/fa";
import Dashboard from "../../../components/navbar/page";
import Footer from "../../../components/footer/page";

interface Note {
  _id: string; // ✅ MongoDB uses _id
  title: string;
  date: string;
  description: string;
}

export default function NotesPage() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [showForm, setShowForm] = useState(false);

  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");

  // ✅ FETCH NOTES
  const fetchNotes = async () => {
    try {
      const res = await axios.get("/api/notes");
      setNotes(res.data);
    } catch (err) {
      console.error("Error fetching notes", err);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  // ✅ ADD NOTE (API)
  const addNote = async () => {
    if (!title || !date) {
      alert("Please fill title and date");
      return;
    }

    try {
      await axios.post("/api/notes", {
        title,
        date,
        description,
      });

      setTitle("");
      setDate("");
      setDescription("");
      setShowForm(false);

      fetchNotes(); // refresh list
    } catch (err) {
      console.error("Error adding note", err);
    }
  };

  // ✅ DELETE NOTE (API)
  const deleteNote = async (id: string) => {
    try {
      await axios.delete(`/api/notes/${id}`);
      fetchNotes();
    } catch (err) {
      console.error("Error deleting note", err);
    }
  };

  return (
    <div className=" bg-green-300 dark:bg-black transition-colors">
      <Dashboard />
        <div className="mb-40">
      <h1 className="text-3xl font-bold text-green-700 mb-6 text-center pt-20 ">
        Intern Details 📝
      </h1>

      {/* Add Button */}
      <div className="flex justify-center mb-6">
        <button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded shadow"
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
            placeholder="Small Note"
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