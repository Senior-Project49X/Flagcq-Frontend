"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Navbar from "../../component/navbar";
import Pagination from "../../component/Pagination";
import Question from "../../component/Question";
import { GetQuestions } from "../../lib/API/QuestionAPI";
import { questions } from "../../lib/types/QuestionType";
import { GetTourPage } from "@/app/lib/API/GetTourPage";

interface TourData {
  name: string;
  teamName: string;
  teamId: number;
  teamRank: number;
  teamScore: number;
  individualScore: number;
  eventEndDate: string;
}

export default function Homepage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get("tournamentId");

  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [selectedDifficulty, setSelectedDifficulty] =
    useState("All Difficulty");
  const [questions, setQuestions] = useState<questions[]>([]);
  const [tourData, setTourData] = useState<TourData | null>(null);
  const [remainingTime, setRemainingTime] = useState("");
  const [page, setPage] = useState("1");
  const [mode, setMode] = useState<string>("Tournament");

  useEffect(() => {
    const fetchUserQuestions = async () => {
      try {
        const userQuestions = await GetQuestions(
          selectedCategory,
          selectedDifficulty,
          page,
          mode
        );
        setQuestions(userQuestions.data);
      } catch (error) {
        console.error("Error fetching questions:", error);
      }
    };

    fetchUserQuestions();
  }, [selectedCategory, selectedDifficulty]);

  useEffect(() => {
    const fetchTourData = async () => {
      try {
        if (!id) return;
        const response = await GetTourPage(Number(id));
        setTourData(response);
      } catch (error) {
        console.error("Error fetching tournament data:", error);
      }
    };

    fetchTourData();
  }, [id]);

  useEffect(() => {
    if (!tourData?.eventEndDate) return;

    const calculateRemainingTime = () => {
      const now = new Date();
      const endDate = new Date(tourData.eventEndDate);
      const remaining = endDate.getTime() - now.getTime();

      if (remaining <= 0) {
        setRemainingTime("Event Ended");
        return;
      }

      const hours = Math.floor(remaining / (1000 * 60 * 60));
      const minutes = Math.floor((remaining % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((remaining % (1000 * 60)) / 1000);

      setRemainingTime(`${hours}:${minutes}:${seconds}`);
    };

    const interval = setInterval(calculateRemainingTime, 1000);
    calculateRemainingTime();

    return () => clearInterval(interval);
  }, [tourData?.eventEndDate]);

  return (
    <div>
      <Navbar />
      <div className="flex">
        <div className="w-80 p-6 bg-darkblue text-white">
          <div className="mb-6">
            <h2 className="text-xl font-bold">Tournament Name</h2>
            <p className="text-lg">{tourData?.name || "Loading..."}</p>
          </div>
          <div className="mb-6">
            <h2 className="text-xl font-bold">Remaining Time</h2>
            <p className="text-lg">{remainingTime || "Calculating..."}</p>
          </div>
          <div className="mb-6">
            <h2 className="text-xl font-bold">Team Rank</h2>
            <p className="text-lg">{tourData?.teamRank || "N/A"}</p>
          </div>
          <div className="mb-6">
            <h2 className="text-xl font-bold">Team Score</h2>
            <p className="text-lg">{tourData?.teamScore || 0} Points</p>
          </div>
          <div className="mb-6">
            <h2 className="text-xl font-bold">Individual Score</h2>
            <p className="text-lg">{tourData?.individualScore || 0} Points</p>
          </div>
          <button
            onClick={() =>
              router.push(
                `/tournament/Tourleaderboard?tournamentId=${Number(
                  id
                )}&teamId=${tourData?.teamId}`
              )
            }
            className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600"
          >
            Leaderboard
          </button>
        </div>

        <div className="flex-1 p-6 rounded-lg">
          <Question
            selectedDifficulty={selectedDifficulty}
            selectedCategory={selectedCategory}
            questions={questions}
          />
          <Pagination
            pagePath={"/?page="}
            pageNumber={null}
            totalPages={10}
            hasNextPage={true}
          />
        </div>
      </div>
    </div>
  );
}
