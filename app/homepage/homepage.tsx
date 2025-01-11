"use client";

import { useState, useEffect } from "react";
import Navbar from "../component/navbar";
import Category from "../category";
import Difficult from "../difficult";
import Pagination from "../component/Pagination";
import { useSearchParams } from "next/navigation";
import Question from "../component/Question";
import { GetQuestions } from "../lib/API/QuestionAPI";
import { GetUserPoints } from "../lib/API/GetUserAPI";
import { questions } from "../lib/types/QuestionType";

export default function Homepage() {
  const searchParams = useSearchParams();
  const page = searchParams.get("page");
  const [selectedCategory, setSelectedCategory] =
    useState<string>("All Categories");
  const [selectedDifficulty, setSelectedDifficulty] =
    useState<string>("All Difficulty");
  const [point, setPoint] = useState<string>("0");
  const [questions, setQuestions] = useState<questions[]>([]);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [hasNextPage, setHasNextPage] = useState<boolean>(true);
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
      setTotalPages(userQuestion.totalPages);
      setHasNextPage(userQuestion.hasNextPage);
      setQuestions(userQuestion.data);
    };

    fetchUserQuestions();
  }, [page, selectedCategory, selectedDifficulty]);
  useEffect(() => {
    const fetchUserData = async () => {
      const userData = await GetUserPoints(); // Now correctly awaits the returned value
      setPoint(userData);
      console.log("a", userData);
    };
    fetchUserData();
  }, [point]);

  return (
    <div>
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
          <Question
            selectedDifficulty={selectedDifficulty}
            selectedCategory={selectedCategory}
            questions={questions}
          />

          <Pagination
            pagePath={"/?page="}
            pageNumber={page}
            totalPages={totalPages}
            hasNextPage={hasNextPage}
          />
        </div>
      </div>
    </div>
  );
}
