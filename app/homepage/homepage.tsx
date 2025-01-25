"use client";

import { useState, useEffect } from "react";
import Navbar from "../component/navbar";
import Category from "../category";
import Difficult from "../difficult";
import Pagination from "../component/Pagination";
import { useSearchParams, useRouter } from "next/navigation";
import Question from "../component/Question";
import { GetQuestions } from "../lib/API/QuestionAPI";
import { GetUserPoints } from "../lib/API/GetUserAPI";
import { questions } from "../lib/types/QuestionType";
import ModeFilter from "../component/ModeFilter";
import { isRoleAdmin } from "../lib/role";

export default function Homepage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const page = searchParams.get("page") ?? "1";
  const [selectedCategory, setSelectedCategory] =
    useState<string>("All Categories");
  const [selectedDifficulty, setSelectedDifficulty] =
    useState<string>("All Difficulty");
  const [point, setPoint] = useState<string>("0");
  const [questions, setQuestions] = useState<questions[]>([]);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [hasNextPage, setHasNextPage] = useState<boolean>(true);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [mode, setMode] = useState<string>("");
  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category);
    router.push("/?page=1");
  };

  const handleDifficultyClick = (difficulty: string) => {
    setSelectedDifficulty(difficulty);
    router.push("/?page=1");
  };

  useEffect(() => {
    const role = isRoleAdmin();
    setIsAdmin(role);
    if (!role) {
      setMode("Practice");
    }
  }, []);

  useEffect(() => {
    const fetchUserQuestions = async () => {
      const result = await GetQuestions(
        selectedCategory,
        selectedDifficulty,
        page,
        mode
      );

      console.log("b", result.data);
      setTotalPages(result.totalPages);
      setHasNextPage(result.hasNextPage);
      setQuestions(result.data);
    };

    fetchUserQuestions();
  }, [page, selectedCategory, selectedDifficulty, mode]);

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
          {isAdmin ? <ModeFilter setMode={setMode} Mode={mode} /> : ""}
          {questions.length !== 0 ? (
            <>
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
            </>
          ) : (
            <div className="text-center text-2xl font-bold text-red-400">
              No Question Found
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
