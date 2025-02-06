"use client";
import { useState } from "react";
import Image from "next/image";

interface DifficultProps {
  selectedDifficulty: string;
  onDifficultyClick: (difficulty: string) => void;
}

const DIFFICULTY_OPTIONS = ["All Difficulty", "Easy", "Medium", "Hard"];

export default function Difficult({
  selectedDifficulty,
  onDifficultyClick,
}: DifficultProps) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleDifficultySelect = (difficulty: string) => {
    onDifficultyClick(difficulty);
  };

  return (
    <div className="bg-[#090147] px-10 py-4 ">
      <div className="w-full">
        <div className="rounded-lg p-6 h-full">
          <div className=" items-center  mb-4 ">
            <h1 className="text-red-400 text-xl font-bold">Difficulty</h1>
          </div>

          <div className="relative">
            <button
              onClick={toggleDropdown}
              className="bg-[#0c0332] text-white py-2 px-4 rounded-lg w-full text-left"
            >
              {selectedDifficulty || "Select Difficulty"}
            </button>

            {isOpen && (
              <ul className="absolute mt-2 bg-white border rounded-lg shadow-lg w-full z-10">
                {DIFFICULTY_OPTIONS.map((difficulty) => (
                  <li key={difficulty} className="px-4 py-2 hover:bg-gray-200">
                    <label className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="radio"
                        value={difficulty}
                        checked={selectedDifficulty === difficulty}
                        onChange={() => handleDifficultySelect(difficulty)}
                        className="form-radio"
                      />
                      <span>{difficulty}</span>
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
