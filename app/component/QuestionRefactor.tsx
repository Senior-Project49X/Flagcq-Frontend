import { useState, useEffect, useCallback } from "react";
import {
  PaginationProp,
  QuestionProps,
  questions,
  SortQeuestions,
} from "../lib/types/QuestionType";
import Category from "../category";
import Difficult from "../difficult";
import ModeFilter from "./ModeFilter";
import { isRoleAdmin } from "../lib/role";
import LoadingComponent from "./LoadingComponent";
import Question from "./Question";
import Pagination from "./Pagination";
import { GetQuestions } from "../lib/API/QuestionAPI";

export default function QuestionRefactor({
  useMode,
  categoryReroute,
  pageNumber,
  PageReroute,
  tournament_id,
  addQuestionTournament,
  questionList,
}: Readonly<QuestionProps>) {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([
    "All Categories",
  ]);
  const [selectedDifficulty, setSelectedDifficulty] =
    useState<string>("All Difficulty");
  const [isLodingComponent, setIsLodingComponent] = useState<boolean>(true);
  const [questions, setQuestions] = useState<questions[]>([]);
  const [modeFilter, setModeFilter] = useState<string>(useMode);
  const [sort, setSort] = useState<SortQeuestions>({
    name: "",
    order: "",
  });
  const [paginationData, setPaginationData] = useState<PaginationProp>({
    totalPages: 0,
    hasNextPage: false,
  });

  const handleUpdateParameter = (
    paramKey: string,
    paramValue: string | number
  ) => {
    const searchParams = new URLSearchParams(window.location.search);
    searchParams.set(paramKey, paramValue.toString());
    const newURL = `${window.location.pathname}?${searchParams.toString()}`;
    window.history.pushState({}, "", newURL);
  };

  const handleCategoryChange = (categories: string[]) => {
    setSelectedCategories(categories);
    handleUpdateParameter("page", "1");
  };

  const handleDifficultyClick = (difficulty: string) => {
    setSelectedDifficulty(difficulty);
    handleUpdateParameter("page", "1");
  };

  const handleModeChange = () => {
    handleUpdateParameter("page", "1");
  };

  const handleOnSort = (sortName: string) => {
    let order = "asc";
    if (sort.name === sortName) {
      order = sort.order === "asc" ? "desc" : "asc";
      setSort({ name: sortName, order: order });
    } else {
      setSort({ name: sortName, order: "asc" });
    }
  };

  const fetchQuestions = useCallback(async () => {
    setIsLodingComponent(true);
    setQuestions([]);
    const result = await GetQuestions(
      selectedCategories.join(","),
      selectedDifficulty,
      pageNumber,
      modeFilter,
      tournament_id,
      addQuestionTournament !== undefined ? true : undefined,
      sort
    );
    setPaginationData({
      totalPages: result.totalPages,
      hasNextPage: result.hasNextPage,
    });
    setQuestions(result.data);
    setIsLodingComponent(false);
  }, [
    modeFilter,
    pageNumber,
    selectedCategories,
    selectedDifficulty,
    sort,
    tournament_id,
    addQuestionTournament,
  ]);

  useEffect(() => {
    fetchQuestions();
  }, [fetchQuestions]);

  return (
    <div>
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
          {isRoleAdmin() && !tournament_id && !addQuestionTournament && (
            <ModeFilter
              setMode={setModeFilter}
              Mode={modeFilter}
              handleModeChange={handleModeChange}
            />
          )}

          {questions.length !== 0 ? (
            <>
              <Question
                addQuestionTournament={addQuestionTournament}
                tournament_id={tournament_id}
                selectedDifficulty={selectedDifficulty}
                selectedCategory={selectedCategories.join(",")}
                questions={questions}
                setSort={handleOnSort}
                sort={sort}
                question_id={questionList}
              />

              <Pagination
                pageNumber={pageNumber}
                totalPages={paginationData.totalPages}
                hasNextPage={paginationData.hasNextPage}
              />
            </>
          ) : (
            <>
              {isLodingComponent ? (
                <LoadingComponent />
              ) : (
                <div className="text-center text-2xl font-bold text-red-400">
                  No Question Found
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
