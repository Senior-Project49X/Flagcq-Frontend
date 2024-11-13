"use client";

import { useState, useEffect } from "react";
import Navbar from "../component/navbar";
import Category from "../category";
import Difficult from "../difficult";
import GeneralSkills from "./question/GeneralSkills";
import Cryptography from "./question/Cryptography";
import Forensics from "./question/Forensics";
import Network from "./question/Network";
import Pagination from "../component/Pagination";
import { useSearchParams } from "next/navigation";

export default function Homepage() {
  const searchParams = useSearchParams();
  const page = searchParams.get("page");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(
    "All Categories"
  );
  const [selectedDifficulty, setSelectedDifficulty] = useState<string | null>(
    "All Difficulty"
  );
  const [isLogin, setIsLogin] = useState(false);

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category);
  };

  const handleDifficultyClick = (difficulty: string) => {
    setSelectedDifficulty(difficulty);
  };

  return (
    <div>
      <>
        <Navbar />
        <div className="flex">
          <Category
            selectedCategory={selectedCategory}
            onCategoryClick={handleCategoryClick}
          />

          <Difficult
            selectedDifficulty={selectedDifficulty}
            onDifficultyClick={handleDifficultyClick}
          />

          {/* Question Box */}
          <div className="flex-1 p-6 rounded-lg">
            {selectedCategory === "All Categories" && (
              <>
                <GeneralSkills selectedDifficulty={selectedDifficulty} />
                <Cryptography selectedDifficulty={selectedDifficulty} />
                <Forensics selectedDifficulty={selectedDifficulty} />
                <Network selectedDifficulty={selectedDifficulty} />
              </>
            )}
            {selectedCategory === "Cryptography" && (
              <Cryptography selectedDifficulty={selectedDifficulty} />
            )}
            {selectedCategory === "General Skills" && (
              <GeneralSkills selectedDifficulty={selectedDifficulty} />
            )}
            {selectedCategory === "Forensics" && (
              <Forensics selectedDifficulty={selectedDifficulty} />
            )}
            {selectedCategory === "Network" && (
              <Network selectedDifficulty={selectedDifficulty} />
            )}
            <Pagination pagePath={"/?page="} pageNumber={page} />
          </div>
        </div>
      </>
    </div>
  );
}
