"use client";

import { useState, useEffect, FormEvent } from "react";
import Navbar from "../../component/Navbar/navbar";
import Category from "../../category";
import Difficult from "../../difficult";
import Pagination from "../../component/Pagination";
import { useSearchParams, useRouter } from "next/navigation";
import Question from "../../component/Question";
import {
  GetQuestions,
  CreateQuestionTournamentAPI,
} from "../../lib/API/QuestionAPI";
import { questions } from "../../lib/types/QuestionType";
import { GetAllTourList } from "@/app/lib/API/GetTourListAPI";

export default function Homepage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const page = searchParams.get("page") ?? "1";
  const [selectedCategory, setSelectedCategory] = useState<string[]>([
    "All Categories",
  ]);
  const [selectedDifficulty, setSelectedDifficulty] =
    useState<string>("All Difficulty");
  const [questions, setQuestions] = useState<questions[]>([]);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [hasNextPage, setHasNextPage] = useState<boolean>(true);
  const [mode, setMode] = useState<string>("");
  const [tournament_id, setTournament_id] = useState<number>(0);
  const [question_id, setQuestion_id] = useState<number[]>([]);
  const [tournamentList, setTournamentList] = useState<any[]>([]);

  const handleCategoryClick = (categories: string[]) => {
    setSelectedCategory(categories);
    router.push("?page=1");
  };

  const handleDifficultyClick = (difficulty: string) => {
    setSelectedDifficulty(difficulty);
    router.push("?page=1");
  };

  const handlePushQuestionID = (id: number) => {
    if (question_id.includes(id))
      setQuestion_id(question_id.filter((qid) => qid !== id));
    else setQuestion_id([...question_id, id]);
  };
  const handleGetAllTourList = async () => {
    try {
      const data = await GetAllTourList();
      setTournamentList(data || []);
    } catch (error) {
      console.error("Error fetching tournament list:", error);
    }
  };

  useEffect(() => {
    handleGetAllTourList();
  }, []);

  useEffect(() => {
    const fetchQuestions = async () => {
      const result = await GetQuestions(
        selectedCategory.join(","),
        selectedDifficulty,
        page,
        "Tournament",
        tournament_id,
        true
      );
      setTotalPages(result.totalPages);
      setHasNextPage(result.hasNextPage);
      setQuestions(result.data);
    };
    fetchQuestions();
  }, [page, selectedCategory, selectedDifficulty, mode]);

  const handleCreateQT = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await CreateQuestionTournamentAPI(question_id, tournament_id);
    } catch (error) {
      console.error("Error CreateQuestionTournament:", error);
    }
  };

  const onSelectTournament = async (
    e: React.ChangeEvent<HTMLSelectElement>
  ): Promise<void> => {
    const TID = Number(e.target.value);
    setQuestion_id([]);
    setTournament_id(TID);
    const result = await GetQuestions(
      selectedCategory.join(","),
      selectedDifficulty,
      page,
      "Tournament",
      TID,
      true
    );
    setTotalPages(result.totalPages);
    setHasNextPage(result.hasNextPage);
    setQuestions(result.data);
  };

  return (
    <div>
      <Navbar />
      <div className="pt-6 text-black mb-4 rounded-lg flex  justify-center">
        <form onSubmit={handleCreateQT} className="flex items-center">
          <label
            htmlFor="tournament-dropdown"
            className="mr-4 text-lg text-red-400"
          >
            Tournament Name:
          </label>
          <select
            id="tournament-dropdown"
            className="w-64 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={tournament_id || ""}
            onChange={onSelectTournament}
          >
            <option value="" disabled>
              Select a Tournament
            </option>
            {tournamentList.map((tournament) => (
              <option key={tournament.id} value={tournament.id}>
                {tournament.name}
              </option>
            ))}
          </select>

          <button
            type="submit"
            className={`ml-4 py-2 px-4 rounded-md ${
              tournament_id === 0 || question_id.length === 0
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-500 hover:bg-blue-600 text-white"
            }`}
            disabled={tournament_id === 0 || question_id.length === 0}
          >
            Submit
          </button>
        </form>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
        <Category
          selectedCategory={selectedCategory}
          onCategoryChange={handleCategoryClick}
        />

        <Difficult
          selectedDifficulty={selectedDifficulty}
          onDifficultyClick={handleDifficultyClick}
        />
      </div>
      {/* Question Box */}
      <div className="flex-1 p-6 rounded-lg">
        {questions.length !== 0 ? (
          <>
            <Question
              addQuestionTournament={handlePushQuestionID}
              selectedDifficulty={selectedDifficulty}
              selectedCategory={selectedCategory.join(",")} // Join the array into a single string
              questions={questions}
              question_id={question_id} // Add this prop
              tournament_id={tournament_id}
              isTable={false}
            />

            <Pagination
              pagePath={"?page="}
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
  );
}
