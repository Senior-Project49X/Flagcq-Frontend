"use client";
import { useState } from "react";
import Image from "next/image";

export default function Difficult() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category);
  };

  return (
    <div className="bg-[#090147] px-8 flex justify-center relative h3/6">
      {/* Main container: Category on left and questions on the right */}
      <div className="flex space-x-8 w-full max-w-7xl">
        {/* Category Box */}
        <div className="border-4 border-red-500 rounded-lg p-6 w-64 -ml-40 relative h-full">
          {/* Category Header */}
          <div className="flex items-center space-x-4 mb-4 mx-4">
            <Image
              src="/category.svg"
              alt="Category logo"
              width={50}
              height={50}
              className="object-contain"
            />
            <h1 className="text-red-400 text-xl font-bold">Difficult</h1>
          </div>

          {/* Category List */}
          <div className="flex flex-col space-y-4">
            <button
              onClick={() => handleCategoryClick("All Difficulty")}
              className={`${
                selectedCategory === "All Difficulty"
                  ? "bg-red-500"
                  : "bg-[#0c0332]"
              } text-white py-2 px-4 rounded-lg hover:bg-red-500`}
            >
              All Difficulty
            </button>
            <button
              onClick={() => handleCategoryClick("Easy")}
              className={`${
                selectedCategory === "Easy" ? "bg-red-500" : "bg-[#0c0332]"
              } text-white py-2 px-4 rounded-lg hover:bg-red-500`}
            >
              Easy
            </button>
            <button
              onClick={() => handleCategoryClick("Medium")}
              className={`${
                selectedCategory === "Medium" ? "bg-red-500" : "bg-[#0c0332]"
              } text-white py-2 px-4 rounded-lg hover:bg-red-500`}
            >
              Medium
            </button>
            <button
              onClick={() => handleCategoryClick("Hard")}
              className={`${
                selectedCategory === "Hard" ? "bg-red-500" : "bg-[#0c0332]"
              } text-white py-2 px-4 rounded-lg hover:bg-red-500`}
            >
              Hard
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
