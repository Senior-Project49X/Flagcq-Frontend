import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { FaAddressBook, FaCog } from "react-icons/fa";
import { IoCreate } from "react-icons/io5";
import { MdAddCircleOutline, MdOutlineCreateNewFolder } from "react-icons/md";

interface AdminToggleProps {
  pathname: string;
}
export default function AdminTogglePage({
  pathname,
}: Readonly<AdminToggleProps>) {
  const navLinks = [
    {
      href: "/admin/CreateQuestion",
      label: "Create Question",
      icon: MdAddCircleOutline,
      className: "text-blue-400 hover:text-blue-300",
    },
    {
      href: "/admin/CreateTournament",
      label: "Create Tournament",
      icon: IoCreate,
      className: "text-blue-400 hover:text-blue-300",
    },
    {
      href: "/admin/CreateQuestionTournament",
      label: "Add Question to Tournament",
      icon: MdOutlineCreateNewFolder,
      className: "text-blue-400 hover:text-blue-300",
    },
    {
      href: "/admin/AddRole",
      label: "Change Role",
      icon: FaAddressBook,
      className: "text-blue-400 hover:text-blue-300",
    },
    // Add more links here as needed
  ];
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
    <div>
      <button
        ref={toggleRef}
        onClick={() => {
          setOpen(!open);
        }}
        className={`text-slate-400 hover:text-slate-100 hover:bg-slate-800 rounded-lg px-4 py-3 items-center space-x-2  ${
          pathname.startsWith("/admin") && "text-green-400"
        }`}
      >
        <FaCog className="inline-block" /> {/* Ensure the icon is inline */}
        Admin Config ▾
        {open && (
          // <div className="absolute left-2 mt-3 w-80  rounded-xl bg-slate-800 shadow-lg ring-1 ring-black ring-opacity-5 opacity-100 scale-100 transition-all duration-200">
          <div className="absolute mt-2 w-50 bg-slate-800  shadow-lg z-20 rounded-xl">
            <div className="p-1">
              {navLinks.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`
              flex items-center gap-3 px-4 py-3 rounded-lg
              ${item.className}
              transition-colors duration-150
              hover:bg-slate-700
              
            `}
                >
                  <item.icon className="w-4 h-4" />
                  <span className="font-medium">{item.label}</span>
                </Link>
              ))}
            </div>
          </div>
        )}
      </button>
    </div>
  );
}
