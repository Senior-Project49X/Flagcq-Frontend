"use client";
import Image from "next/image";

interface DifficultProps {
  selectedDifficulty: string | null;
  onDifficultyClick: (difficulty: string) => void;
}

export default function Difficult({
  selectedDifficulty,
  onDifficultyClick,
}: DifficultProps) {
  return (
    <div className="bg-[#090147] py-4 flex justify-center relative h3/6">
      {/* Main container: Category on the left */}
      <div className="flex space-x-8 w-full max-w-7xl">
        {/* Category Box */}
        <div className="border-4 border-red-500 rounded-lg p-6 w-64  relative h-full">
          {/* Difficulty Header */}
          <div className="flex items-center space-x-4 mb-4 mx-4">
            <Image
              src="/category.svg"
              alt="Category logo"
              width={50}
              height={50}
              className="object-contain"
            />
            <h1 className="text-red-400 text-xl font-bold">Difficulty</h1>
          </div>

          {/* Difficulty List */}
          <div className="flex flex-col space-y-4">
            <button
              onClick={() => onDifficultyClick("All Difficulty")}
              className={`${
                selectedDifficulty === "All Difficulty"
                  ? "bg-red-500"
                  : "bg-[#0c0332]"
              } text-white py-2 px-4 rounded-lg hover:bg-red-500`}
            >
              All Difficulty
            </button>
            <button
              onClick={() => onDifficultyClick("Easy")}
              className={`${
                selectedDifficulty === "Easy" ? "bg-red-500" : "bg-[#0c0332]"
              } text-white py-2 px-4 rounded-lg hover:bg-red-500`}
            >
              Easy
            </button>
            <button
              onClick={() => onDifficultyClick("Medium")}
              className={`${
                selectedDifficulty === "Medium" ? "bg-red-500" : "bg-[#0c0332]"
              } text-white py-2 px-4 rounded-lg hover:bg-red-500`}
            >
              Medium
            </button>
            <button
              onClick={() => onDifficultyClick("Hard")}
              className={`${
                selectedDifficulty === "Hard" ? "bg-red-500" : "bg-[#0c0332]"
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
