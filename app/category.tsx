"use client";
import { useState, useEffect, useRef } from "react";

interface CategoryProps {
  selectedCategory: string[];
  onCategoryChange: (category: string[]) => void;
}

const CATEGORY_OPTIONS = [
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

  useEffect(() => {
    if (selectedCategory.includes("All Categories")) {
      onCategoryChange([]);
    }
  }, [selectedCategory, onCategoryChange]);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleCategoryClick = (category: string) => {
    if (category === "All Categories") {
      if (selectedCategory.length === CATEGORY_OPTIONS.length) {
        onCategoryChange([]);
      } else {
        onCategoryChange(CATEGORY_OPTIONS);
      }
    } else {
      if (selectedCategory.includes(category)) {
        onCategoryChange(selectedCategory.filter((c) => c !== category));
      } else {
        onCategoryChange([...selectedCategory, category]);
      }
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
    <div className="bg-[#090147] px-10">
      <div className="w-full">
        <div className="rounded-lg p-6 h-full">
          <div className="items-center mb-2">
            <h1 className="text-red-400 text-xl font-bold">Category</h1>
          </div>

          <div className="relative" ref={dropdownRef}>
            <button
              onClick={toggleDropdown}
              className="bg-gray-900 text-white py-2 px-4 rounded-lg w-full text-left h-12 border-green-300 border-2 hover:bg-gray-800"
            >
              {selectedCategory.length > 0
                ? selectedCategory.join(", ")
                : "Select Category"}
            </button>

            {isOpen && (
              <div className="absolute mt-2 bg-gray-700 border rounded-lg shadow-lg w-full z-10 cursor-pointer">
                <button
                  key="all-categories"
                  className="px-4 py-2 hover:bg-gray-500 w-full"
                  onClick={() => handleCategoryClick("All Categories")}
                >
                  <div className="flex items-center space-x-2 cursor-pointer text-white">
                    <input
                      type="checkbox"
                      checked={
                        selectedCategory.length === CATEGORY_OPTIONS.length
                      }
                      onChange={() => handleCategoryClick("All Categories")}
                      className="w-4 h-4 text-green-500 bg-green-500 border-green-500 rounded-full accent-green-400/25"
                    />
                    <span>All Categories</span>
                  </div>
                </button>

                {CATEGORY_OPTIONS.map((category) => (
                  <button
                    key={category}
                    className="px-4 py-2 hover:bg-gray-500 w-full"
                    onClick={() => handleCategoryClick(category)}
                  >
                    <div className="flex items-center space-x-2 cursor-pointer text-white  ">
                      <input
                        type="checkbox"
                        checked={selectedCategory.includes(category)}
                        onChange={() => handleCategoryClick(category)}
                        className="w-4 h-4 text-green-500 bg-green-500 border-green-500 rounded-full accent-green-400/25"
                      />
                      <span>{category}</span>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
