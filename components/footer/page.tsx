"use client";
import Link from "next/link";

export default function Footer() {
  return (
    <div>
      <div className=" bg-green-50 dark:bg-black transition-colors">


 {/* 📝 Footer */}
        <footer className="bg-white dark:bg-zinc-900 shadow-inner py-10 mt-auto">
          <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500 dark:text-gray-400">
            <p>© {new Date().getFullYear()} My Dashboard. All rights reserved.</p>
            <div className="flex gap-4 mt-2 md:mt-0">
              <Link href="/privacy" className="hover:underline">Privacy Policy</Link>
              <Link href="/terms" className="hover:underline">Terms of Service</Link>
              <Link href="/contact" className="hover:underline">Contact</Link>
            </div>
          </div>
        </footer>

      </div>
    </div>
  );
}