"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { isRoleAdmin } from "../../lib/role";

export default function ProfileToggle() {
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);

  useEffect(() => {
    setIsAdmin(isRoleAdmin());
  }, []);

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
      onClick={() => setOpen(!open)}
      className="w-12 h-12 rounded-full object-cover bg-white"
    >
      <Image
        src="/aw_eng_secondary&icon-03.svg"
        alt="Profile"
        width={60}
        height={60}
        className="object-contain"
      />
      {open && (
        <div className="absolute right-0 mt-2 w-48 bg-gray-600 rounded-md shadow-lg z-20 border-2 border-white">
          <Link
            href="/profile"
            className="block px-4 py-2 text-blue-500 hover:bg-gray-500"
          >
            Profile
          </Link>
          <Link
            href="/aboutus"
            className="block px-4 py-2 text-white hover:bg-gray-500"
          >
            About Us
          </Link>

          {/* Hide "My Team" if admin */}
          {!isAdmin && (
            <Link
              href="/myteam"
              className="block px-4 py-2 text-gray-700 hover:bg-gray-500"
            >
              My Team
            </Link>
          )}

          <Link
            href="/logout"
            className="block px-4 py-2 text-red-500 hover:bg-gray-500"
          >
            Logout
          </Link>
        </div>
      )}
    </button>
  );
}
