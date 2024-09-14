"use client";

import { useState } from "react";
import Navbar from "./navbar";
import Category from "./category";
import Difficult from "./difficult";
import GeneralSkills from "./question/GeneralSkills";
import Cryptography from "./question/Cryptography";
import Forensics from "./question/Forensics";
import Network from "./question/Network";

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedDifficulty, setSelectedDifficulty] = useState<string | null>(
    null
  );

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category);
  };

  const handleDifficultyClick = (difficulty: string) => {
    setSelectedDifficulty(difficulty);
  };

  return (
    <div>
      <Navbar />

      <div className="flex">
        {/* Category Box */}
        <Category
          selectedCategory={selectedCategory}
          onCategoryClick={handleCategoryClick}
        />
        {/* Difficulty Box */}
        <Difficult
          selectedDifficulty={selectedDifficulty}
          onDifficultyClick={handleDifficultyClick}
        />
        {/* Question Box */}
        <div className="flex-1 p-6 rounded-lg">
          {/* Display questions based on category and difficulty */}
          {selectedCategory === "All Categories" && (
            <>
              {selectedDifficulty === "Easy" && (
                <p>Easy questions for all categories</p>
              )}
              {selectedDifficulty === "Medium" && (
                <p>Medium questions for all categories</p>
              )}
              {selectedDifficulty === "Hard" && (
                <p>Hard questions for all categories</p>
              )}
              {selectedDifficulty === "All Difficulty" && (
                <>
                  <GeneralSkills />
                  <Cryptography />
                  <Network />
                  <Forensics />
                </>
              )}
            </>
          )}

          {selectedCategory === "General Skills" && (
            <>
              {selectedDifficulty === "Easy" && (
                <p>Easy General Skills questions</p>
              )}
              {selectedDifficulty === "Medium" && (
                <p>Medium General Skills questions</p>
              )}
              {selectedDifficulty === "Hard" && (
                <p>Hard General Skills questions</p>
              )}
              {selectedDifficulty === "All Difficulty" && <GeneralSkills />}
            </>
          )}

          {selectedCategory === "Cryptography" && (
            <>
              {selectedDifficulty === "Easy" && (
                <p>Easy Cryptography questions</p>
              )}
              {selectedDifficulty === "Medium" && (
                <p>Medium Cryptography questions</p>
              )}
              {selectedDifficulty === "Hard" && (
                <p>Hard Cryptography questions</p>
              )}
              {selectedDifficulty === "All Difficulty" && <Cryptography />}
            </>
          )}

          {selectedCategory === "Network" && (
            <>
              {selectedDifficulty === "Easy" && <p>Easy Network questions</p>}
              {selectedDifficulty === "Medium" && (
                <p>Medium Network questions</p>
              )}
              {selectedDifficulty === "Hard" && <p>Hard Network questions</p>}
              {selectedDifficulty === "All Difficulty" && <Network />}
            </>
          )}

          {selectedCategory === "Forensics" && (
            <>
              {selectedDifficulty === "Easy" && <p>Easy Forensics questions</p>}
              {selectedDifficulty === "Medium" && (
                <p>Medium Forensics questions</p>
              )}
              {selectedDifficulty === "Hard" && <p>Hard Forensics questions</p>}
              {selectedDifficulty === "All Difficulty" && <Forensics />}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
