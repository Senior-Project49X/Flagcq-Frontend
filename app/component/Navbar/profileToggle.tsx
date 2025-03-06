"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { isRoleAdmin } from "../../lib/role";
import { FaUser, FaUsers, FaInfoCircle, FaSignOutAlt } from "react-icons/fa";
import { MdReportProblem } from "react-icons/md";
import { RiSurveyFill } from "react-icons/ri";

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
      className="w-12 h-12 rounded-full object-cover bg-white duration-200"
    >
      <Image
        src="/aw_eng_secondary&icon-03.svg"
        alt="Profile"
        width={60}
        height={60}
        className="object-contain"
      />
      {open && (
        <div className="absolute right-0 mt-3 w-56 overflow-hidden rounded-xl bg-slate-800 shadow-lg ring-1 ring-black ring-opacity-5 transform opacity-100 scale-100 transition-all duration-200">
          <div className="p-1">
            <Link
              href="/profile"
              className="flex items-center gap-3 px-4 py-3 rounded-lg text-blue-400 hover:text-blue-300 transition-colors duration-150 hover:bg-slate-700"
            >
              <FaUser className="w-4 h-4" />
              <span className="font-medium">Profile</span>
            </Link>

            <Link
              href="/aboutus"
              className="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-200 hover:text-white transition-colors duration-150 hover:bg-slate-700"
            >
              <FaInfoCircle className="w-4 h-4" />
              <span className="font-medium">About Us</span>
            </Link>

            <Link
              href="https://docs.google.com/forms/d/e/1FAIpQLSdD88FSRwO7ixUcQXmOL8NyKK3LuMEWeAy3p8S_T2RCE7--8Q/viewform?usp=preview"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-200 hover:text-white transition-colors duration-150 hover:bg-slate-700"
            >
              <RiSurveyFill className="w-4 h-4 text-green-300" />
              <span className="font-medium text-green-300">Feedback</span>
            </Link>
            <Link
              href="https://docs.google.com/forms/d/e/1FAIpQLSdwhvVXIKdQJuXcqK-hlzHeO7-RlGVealidfq-ifV9RWG9yWw/viewform"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-200 hover:text-white transition-colors duration-150 hover:bg-slate-700"
            >
              <MdReportProblem className="w-4 h-4 text-red-300" />
              <span className="font-medium text-red-300">Report issue</span>
            </Link>
            {!isAdmin && (
              <Link
                href="/myteam"
                className="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-200 hover:text-white transition-colors duration-150 hover:bg-slate-700"
              >
                <FaUsers className="w-4 h-4" />
                <span className="font-medium">My Team</span>
              </Link>
            )}

            <Link
              href="/logout"
              className="flex items-center gap-3 px-4 py-3 rounded-lg text-red-400 hover:text-red-300 transition-colors duration-150 hover:bg-slate-700 mt-1 border-t border-slate-600"
            >
              <FaSignOutAlt className="w-4 h-4" />
              <span className="font-medium">Logout</span>
            </Link>
          </div>
        </div>
      )}
    </button>
  );
}
