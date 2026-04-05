"use client";

import { useState } from "react";
import { FaTasks, FaUserGraduate, FaStickyNote, FaLayerGroup } from "react-icons/fa";
import Dashboard from "../../components/navbar/page";
import Footer from "../../components/footer/page";
export default function Home() {

  const cards = [
    { title: "Todo List", icon: <FaTasks size={28} />, link: "/todo" },
    { title: "Intern", icon: <FaUserGraduate size={28} />, link: "/intern" },
    { title: "Time Table", icon: <FaStickyNote size={28} />, link: "/timetable" },
    { title: "My Other", icon: <FaLayerGroup size={28} />, link: "/other" },
  ];

  return (
    <div className="flex flex-col min-h-screen  bg-green-300 dark:bg-black transition-colors">
    <div className=" dark:bg-black transition-colors ">
      <Dashboard />
            <div className="  grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-50 mb-40 px-4 md:px-10">
              {cards.map((card, index) => (
                <div
                  key={index}
                  className="bg-white dark:bg-zinc-900 p-6 rounded-2xl shadow-md hover:shadow-xl hover:scale-105 transition duration-300 cursor-pointer"
                >
                  <div className="text-green-600 mb-4">
                    {card.icon}
                  </div>

                  <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
                    {card.title}
                  </h2>

                  <a
                    href={card.link}
                    className="text-green-600 hover:underline"
                  >
                    View
                  </a>
                </div>
              ))}
            </div>
            </div>
<Footer />
          </div>
          
        )}
