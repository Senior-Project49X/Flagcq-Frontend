"use client";

import { useState, useEffect } from "react";
import Navbar from "../../component/navbar";
import Pagination from "../../component/Pagination";
import Question from "../../component/Question";
import { GetQuestions } from "../../lib/API/QuestionAPI";
import { GetUserPoints } from "../../lib/API/GetUserAPI";
import { GetLbTourData } from "../../lib/API/GetLbTourAPI";
import { questions } from "../../lib/types/QuestionType";

export default function Homepage() {
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [selectedDifficulty, setSelectedDifficulty] =
    useState("All Difficulty");
  const [point, setPoint] = useState<string>("0");
  const [questions, setQuestions] = useState<questions[]>([]);
  const [leaderboardData, setLeaderboardData] = useState<
    { team_name: string; total_points: number; rank: string }[]
  >([]);
  const [remainingTime, setRemainingTime] = useState("");

  const eventStartDate = new Date("2024-12-06T08:00:00Z");
  const eventEndDate = new Date("2024-12-07T23:59:59Z");

  useEffect(() => {
    const fetchUserQuestions = async () => {
      const userQuestion = await GetQuestions(
        selectedCategory,
        selectedDifficulty,
        null
      );
      setQuestions(userQuestion.data);
    };

    fetchUserQuestions();
  }, [selectedCategory, selectedDifficulty]);

  useEffect(() => {
    const fetchUserData = async () => {
      const userData = await GetUserPoints();
      setPoint(userData);
    };
    fetchUserData();
  }, []);

  useEffect(() => {
    const fetchLeaderboardData = async () => {
      try {
        const response = await GetLbTourData("1");
        const parsedData = Array.isArray(response) ? response : [];
        setLeaderboardData(parsedData);
      } catch (error) {
        console.error("Error fetching leaderboard data:", error);
      }
    };

    fetchLeaderboardData();
  }, []);

  // Countdown Logic
  useEffect(() => {
    const calculateRemainingTime = () => {
      const now = new Date();
      const remaining = eventEndDate.getTime() - now.getTime();

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
    calculateRemainingTime(); // Initial calculation

    return () => clearInterval(interval); // Cleanup interval
  }, [eventEndDate]);

  return (
    <div>
      <Navbar point={point} />
      <div className="flex">
        <div className="w-80 p-6 bg-darkblue text-white">
          <div className="mb-6">
            <h2 className="text-xl font-bold">Tournament Name</h2>
            <p className="text-lg">CyberSec Challenge</p>
          </div>
          <div className="mb-6">
            <h2 className="text-xl font-bold">Remaining Time</h2>
            <p className="text-lg">{remainingTime}</p>
          </div>
          <div className="mb-6">
            <h2 className="text-xl font-bold">Team Rank</h2>
            <p className="text-lg">{leaderboardData[0]?.rank || "N/A"}</p>
          </div>
          <div className="mb-6">
            <h2 className="text-xl font-bold">Team Score</h2>
            <p className="text-lg">
              {leaderboardData[0]?.total_points || 0} Points
            </p>
          </div>
          <div className="mb-6">
            <h2 className="text-xl font-bold">Individual Score</h2>
            <p className="text-lg">{point} Points</p>
          </div>
          <button className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600">
            Leaderboard
          </button>
        </div>

        {/* Question Box */}
        <div className="flex-1 p-6 rounded-lg">
          <Question
            selectedDifficulty={selectedDifficulty}
            selectedCategory={selectedCategory}
            questions={questions}
          />
          <Pagination pagePath={"/?page="} pageNumber={null} />
        </div>
      </div>
    </div>
  );
}
