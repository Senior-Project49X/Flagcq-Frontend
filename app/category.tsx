"use client";
import { useState, useEffect, useRef } from "react";

interface CategoryProps {
  selectedCategory: string[];
  onCategoryChange: (category: string[]) => void;
}

const CATEGORY_OPTIONS = [
  "All Categories",
  "General Skill",
  "Cryptography",
  "Network",
  "Forensics",
];

export default function Category({
  selectedCategory,
  onCategoryChange,
}: CategoryProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleCategoryClick = (category: string) => {
    if (selectedCategory.includes(category)) {
      onCategoryChange(selectedCategory.filter((c) => c !== category));
    } else {
      onCategoryChange([...selectedCategory, category]);
    }
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="bg-[#090147] px-10 py-4">
      <div className="w-full">
        <div className="rounded-lg p-6 h-full">
          <div className="items-center mb-4">
            <h1 className="text-red-400 text-xl font-bold">Category</h1>
          </div>

          <div className="relative" ref={dropdownRef}>
            <button
              onClick={toggleDropdown}
              className="bg-gray-800 text-white py-2 px-4 rounded-lg w-full text-left h-12 border-green-300 border-2 hover:bg-gray-900"
            >
              {selectedCategory.length > 0
                ? selectedCategory.join(", ")
                : "Select Categories"}
            </button>

            {isOpen && (
              <ul className="absolute mt-2 bg-gray-700 border rounded-lg shadow-lg w-full z-10">
                {CATEGORY_OPTIONS.map((category) => (
                  <li key={category} className="px-4 py-2 hover:bg-gray-500">
                    <label className="flex items-center space-x-2 cursor-pointer text-white">
                      <input
                        type="checkbox"
                        checked={selectedCategory.includes(category)}
                        onChange={() => handleCategoryClick(category)}
                        className="w-4 h-4 text-green-500 bg-green-500 border-green-500 rounded-full accent-green-400/25"
                      />
                      <span>{category}</span>
                    </label>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
