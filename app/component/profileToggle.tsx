"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";

export default function ProfileToggle() {
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        toggleRef.current &&
        !toggleRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <button
      ref={toggleRef}
      onClick={() => {
        setOpen(!open);
      }}
      className="w-12 h-12 rounded-full object-cover bg-white"
    >
      {open && (
        <div className="absolute right-0 mt-2 w-48 bg-gray-100 rounded-md shadow-lg z-20 ">
          <Link
            href="/profile"
            className="block px-4 py-2 text-gray-700 hover:bg-gray-200"
          >
            profile
          </Link>
          <Link
            href="/myteam"
            className="block px-4 py-2 text-gray-700 hover:bg-gray-200"
          >
            My team
          </Link>
          <Link
            href="/logout"
            className="block px-4 py-2 text-red-700 hover:bg-gray-200"
          >
            logout
          </Link>
        </div>
      )}
    </button>
  );
}
