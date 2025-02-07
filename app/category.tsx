"use client";
import { useState } from "react";

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

  return (
    <div className="bg-[#090147] px-10 py-4 ">
      <div className="w-full">
        <div className="rounded-lg p-6 h-full">
          <div className=" items-center  mb-4 ">
            <h1 className="text-red-400 text-xl font-bold">Category</h1>
          </div>

          <div className="relative">
            <button
              onClick={toggleDropdown}
              className="bg-[#0c0332] text-white py-2 px-4 rounded-lg w-full text-left"
            >
              {selectedCategory.length > 0
                ? selectedCategory.join(", ")
                : "Select Categories"}
            </button>

            {isOpen && (
              <ul className="absolute mt-2 bg-white border rounded-lg shadow-lg w-full z-10">
                {CATEGORY_OPTIONS.map((category) => (
                  <li key={category} className="px-4 py-2 hover:bg-gray-200">
                    <label className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={selectedCategory.includes(category)}
                        onChange={() => handleCategoryClick(category)}
                        className="form-checkbox"
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
