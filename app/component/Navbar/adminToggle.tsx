import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";

interface AdminToggleProps {
  pathname: string;
}
export default function AdminTogglePage({
  pathname,
}: Readonly<AdminToggleProps>) {
  const navLinks = [
    { href: "/admin/CreateQuestion", label: "Create Question" },
    { href: "/admin/CreateTournament", label: "Create Tournament" },
    {
      href: "/admin/CreateQuestionTournament",
      label: "Add Question to Tournament",
    },
    { href: "/admin/AddRole", label: "Add Role" },
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
        className={`  h-fit mt-3 
          ${pathname.startsWith("/admin") && "text-green-400"}
            `}
      >
        Admin Config ▾
        {open && (
          <div className="absolute mt-2 w-50 bg-gray-100 rounded-md shadow-lg z-20 ">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block px-4 py-2 text-gray-700 hover:bg-gray-200 text-left"
              >
                {link.label}
              </Link>
            ))}
          </div>
        )}
      </button>
    </div>
  );
}
