"use client";

import { useState } from "react";
import Link from "next/link";

export default function ProfileToggle() {
  const [open, setOpen] = useState(false);
  return (
    <button
      onClick={() => {
        setOpen(!open);
      }}
      className="w-12 h-12 rounded-full object-cover bg-white"
    >
      {open && (
        <div className="absolute right-0 mt-2 w-48 bg-gray-100 rounded-md shadow-lg z-20">
          <Link
            href="/profile"
            className="block px-4 py-2 text-gray-700 hover:bg-gray-200"
          >
            profile
          </Link>
          <Link href="/logout">logout</Link>
        </div>
      )}
    </button>
  );
}
