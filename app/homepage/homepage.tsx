"use client";

import { useState, useEffect } from "react";
import Navbar from "../component/navbar";
import Category from "../category";
import Difficult from "../difficult";
import Pagination from "../component/Pagination";
import { useSearchParams } from "next/navigation";
import Question from "../component/Question";
import { GetQuestions } from "../lib/API/QuestionAPI";
import ScoreBar from "../component/ScoreBar";
import { GetUserPoints } from "../lib/API/GetUserAPI";
import { questions } from "../lib/types/QuestionType";

export default function Homepage() {
  const searchParams = useSearchParams();
  const page = searchParams.get("page");
  const [selectedCategory, setSelectedCategory] =
    useState<string>("All Categories");
  const [selectedDifficulty, setSelectedDifficulty] =
    useState<string>("All Difficulty");
  const [isLogin, setIsLogin] = useState(false);
  const [point, setPoint] = useState<string>("0");
  const [questions, setQuestions] = useState<questions[]>([]);

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category);
  };

  const handleDifficultyClick = (difficulty: string) => {
    setSelectedDifficulty(difficulty);
  };

  useEffect(() => {
    const fetchUserQuestions = async () => {
      const userQuestion = await GetQuestions(
        selectedCategory,
        selectedDifficulty,
        page
      );
      console.log("b", userQuestion.data);
      setQuestions(userQuestion.data);
    };

    fetchUserQuestions();
  }, [page, selectedCategory, selectedDifficulty]);
  useEffect(() => {
    const fetchUserData = async () => {
      const userData = await GetUserPoints(); // Now correctly awaits the returned value
      setPoint(userData);
      console.log("a", point);
    };
    fetchUserData();
  }, [point]);

  return (
    <div>
      <>
        <Navbar />
        <ScoreBar point={point} />
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
                questions={questions}
              />
            </>

            <Pagination pagePath={"/?page="} pageNumber={page} />
          </div>
        </div>
      </>
    </div>
  );
}
