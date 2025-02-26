"use client";

import { useState, useEffect } from "react";
import Navbar from "../component/Navbar/navbar";
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
  const [sort, setSort] = useState<{ name: string; order: string }>({
    name: "",
    order: "acs",
  });

  // Change from single to multi-select for categories
  const [selectedCategories, setSelectedCategories] = useState<string[]>([
    "All Categories",
  ]);
  const [selectedDifficulty, setSelectedDifficulty] =
    useState<string>("All Difficulty");
  const [point, setPoint] = useState<string>("0");
  const [questions, setQuestions] = useState<questions[]>([]);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [hasNextPage, setHasNextPage] = useState<boolean>(true);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [mode, setMode] = useState<string>("");

  const handleCategoryChange = (categories: string[]) => {
    setSelectedCategories(categories);
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

  const handleOnSort = (sortName: string) => {
    let order = "asc";
    if (sort.name === sortName) {
      order = sort.order === "asc" ? "desc" : "asc";
      setSort({ name: sortName, order: order });
    } else {
      setSort({ name: sortName, order: "asc" });
    }

    const fetchUserQuestions = async () => {
      const result = await GetQuestions(
        selectedCategories.join(","),
        selectedDifficulty,
        page,
        isRoleAdmin() ? mode : "Practice",
        undefined,
        undefined,
        { name: sortName, order: order }
      );
      setTotalPages(result.totalPages);
      setHasNextPage(result.hasNextPage);
      setQuestions(result.data);
    };
    fetchUserQuestions();
  };

  useEffect(() => {
    const fetchUserQuestions = async () => {
      const result = await GetQuestions(
        selectedCategories.join(","),
        selectedDifficulty,
        page,
        isRoleAdmin() ? mode : "Practice"
      );
      setTotalPages(result.totalPages);
      setHasNextPage(result.hasNextPage);
      setQuestions(result.data);
    };

    fetchUserQuestions();
  }, [page, selectedCategories, selectedDifficulty, mode]);

  useEffect(() => {
    const fetchUserData = async () => {
      const userData = await GetUserPoints();
      setPoint(userData);
    };
    fetchUserData();
  }, [point]);
  const handleModeChange = () => {
    router.push("?page=1");
  };
  return (
    <div>
      <Navbar />
      <div className="flex">
        <div className="flex-1 p-6 rounded-lg">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
            <Category
              selectedCategory={selectedCategories}
              onCategoryChange={handleCategoryChange}
            />

            <Difficult
              selectedDifficulty={selectedDifficulty}
              onDifficultyClick={handleDifficultyClick}
            />
          </div>
          {isAdmin ? (
            <ModeFilter
              setMode={setMode}
              Mode={mode}
              handleModeChange={handleModeChange}
            />
          ) : (
            ""
          )}

          {questions.length !== 0 ? (
            <>
              <Question
                selectedDifficulty={selectedDifficulty}
                selectedCategory={selectedCategories.join(",")}
                questions={questions}
                setSort={handleOnSort}
                sort={sort}
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
