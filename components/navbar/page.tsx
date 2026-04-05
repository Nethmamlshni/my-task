"use client";

import { useState } from "react";
import { FaTasks, FaUserGraduate, FaStickyNote, FaLayerGroup } from "react-icons/fa";
import Link from "next/link";

export default function Dashboard() {

  return (
    <div>

        {/* 🌿 Navbar */}
        <nav className="bg-white dark:bg-zinc-900 shadow-md py-4 px-6 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-green-600">Dashboard 🌿</h1>

          <div className="flex items-center gap-4">
            <Link href="/" className="text-green-600 hover:underline">
              Home
            </Link>
            <Link href="/timetable" className="text-green-600 hover:underline">
              Time Table
            </Link>
          </div>
        </nav>

      </div>
  );
}