"use client";

import Navbar from "../../component/navbar";
import { GetLbTourData } from "../../lib/API/GetLbTourAPI";
import { useState, useEffect } from "react";

export default function TeamLeaderboard() {
  const [leaderboardData, setLeaderboardData] = useState<
    { team_name: string; total_points: number; rank: string }[]
  >([]); // Leaderboard data

  useEffect(() => {
    const fetchLeaderboardData = async () => {
      try {
        const response = await GetLbTourData("1");
        console.log("Leaderboard data:", response); // Debugging the response
        const parsedData = Array.isArray(response) ? response : [];
        setLeaderboardData(parsedData);
      } catch (error) {
        console.error("Error fetching leaderboard data:", error);
      }
    };

    fetchLeaderboardData();
  }, []); // Dependency array ensures this runs once on mount

  const Team = { team: "team1", rank: "1st", score: 4500 };

  return (
    <div className="min-h-screen bg-[#090147] text-white">
      <Navbar />

      <div className="max-w-3xl mx-auto p-8">
        <h1 className="text-2xl font-bold mb-8 text-center">
          Tournament Leaderboard
        </h1>
        <h1 className="text-2xl font-bold mb-8 text-center">
          Linux for CPE 2025
        </h1>

        {/* Leaderboard */}
        <div className="bg-gray-100 rounded-lg p-6 text-black shadow-md">
          <div className="flex justify-between mb-4">
            <span className="font-bold">Team</span>
            <span className="font-bold">Score</span>
          </div>
          <hr className="border-t-2 mb-4" />
          {Array.isArray(leaderboardData) && leaderboardData.length > 0 ? (
            leaderboardData.map((entry, index) => (
              <div
                key={index}
                className="flex justify-between items-center text-lg mb-2"
              >
                <span>{entry.rank}</span>
                <span>{entry.team_name}</span>
                <span>{entry.total_points}</span>
              </div>
            ))
          ) : (
            <div className="text-center text-gray-500">
              No leaderboard data available.
            </div>
          )}
        </div>
        <br />
        {/* Team Summary */}
        <div className="bg-gray-100 rounded-lg p-6 text-black shadow-md mb-8">
          <div className="mb-4">
            <div className="font-semibold text-xl">Team: {Team.team}</div>
          </div>
          <div className="mb-2">
            <div className="font-medium">{Team.rank} place</div>
          </div>
          <div className="mb-2">
            <div>{Team.score} points</div>
          </div>
        </div>
      </div>
    </div>
  );
}
