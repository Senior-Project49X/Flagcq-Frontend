"use client";

import { useState, useEffect, FormEvent } from "react";
import Navbar from "../../component/navbar";
import Category from "../../category";
import Difficult from "../../difficult";
import Pagination from "../../component/Pagination";
import { useSearchParams, useRouter } from "next/navigation";
import Question from "../../component/Question";
import { GetQuestions } from "../../lib/API/QuestionAPI";
import { GetUserPoints } from "../../lib/API/GetUserAPI";
import { questions } from "../../lib/types/QuestionType";
import ModeFilter from "../../component/ModeFilter";
import { isRoleAdmin } from "../../lib/role";
import { CreateQuestionTournamentAPI } from "../../lib/API/QuestionAPI";
import { GetAllTourList } from "@/app/lib/API/GetTourListAPI";

export default function Homepage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const page = searchParams.get("page") ?? "1";
  const [selectedCategory, setSelectedCategory] =
    useState<string>("All Categories");
  const [selectedDifficulty, setSelectedDifficulty] =
    useState<string>("All Difficulty");
  const [questions, setQuestions] = useState<questions[]>([]);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [hasNextPage, setHasNextPage] = useState<boolean>(true);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [mode, setMode] = useState<string>("");
  const [tournament_id, setTournament_id] = useState<number>(0);
  const [question_id, setQuestion_id] = useState<number[]>([]);
  const [tournamentList, setTournamentList] = useState<any[]>([]);

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category);
    router.push("/?page=1");
  };

  const handleDifficultyClick = (difficulty: string) => {
    setSelectedDifficulty(difficulty);
    router.push("/?page=1");
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
    const role = isRoleAdmin();
    setIsAdmin(role);
    if (!role) {
      setMode("Practice");
    }
    handleGetAllTourList();
  }, []);

  const handleCreateQT = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await CreateQuestionTournamentAPI(question_id, tournament_id);
    } catch (error) {
      console.error("Error CreateQuestionTournament:", error);
    }
  };

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
      <div className="fixed bottom-0 left-0 right-0 bg-white text-black shadow-md p-6 flex items-center justify-center">
        <form onSubmit={handleCreateQT} className="flex items-center">
          <label htmlFor="tournament-dropdown" className="mr-4 text-lg">
            Tournament Name:
          </label>
          <select
            id="tournament-dropdown"
            className="w-64 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={tournament_id}
            onChange={(e) => setTournament_id(Number(e.target.value))}
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
            className="ml-4 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
