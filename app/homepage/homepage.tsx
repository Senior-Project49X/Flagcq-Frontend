"use client";

import { useState, useEffect } from "react";
import Navbar from "../component/navbar";
import Category from "../category";
import Difficult from "../difficult";
import Pagination from "../component/Pagination";
import { useSearchParams } from "next/navigation";
import Question from "../component/Question";
import { GetQuestions } from "../lib/API/QuestionAPI";
import ScoreBar from "../component/Scorebar";

export default function Homepage() {
  const searchParams = useSearchParams();
  const page = searchParams.get("page");
  const [selectedCategory, setSelectedCategory] =
    useState<string>("All Categories");
  const [selectedDifficulty, setSelectedDifficulty] =
    useState<string>("All Difficulty");
  const [isLogin, setIsLogin] = useState(false);

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category);
  };

  const handleDifficultyClick = (difficulty: string) => {
    setSelectedDifficulty(difficulty);
  };
  useEffect(() => {
    GetQuestions(selectedCategory, selectedDifficulty, page);
  }, [selectedCategory, selectedDifficulty, page]);
  return (
    <div>
      <>
        <Navbar />
        <ScoreBar />
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
            <>
              <Question
                selectedDifficulty={selectedDifficulty}
                selectedCategory={selectedCategory}
              />
            </>

            <Pagination pagePath={"/?page="} pageNumber={page} />
          </div>
        </div>
      </>
    </div>
  );
}
