"use client";

import Navbar from "../component/Navbar/navbar";
import { GetLbData } from "../lib/API/GetLbAPI";
import { GetUserData } from "../lib/API/GetUserAPI";
import { useState, useEffect } from "react";

// Define types for the leaderboard data and user data
type LeaderboardEntry = {
  rank: number;
  User: {
    first_name: string | null;
    last_name: string | null;
  };
  points: number;
};

type UserData = {
  rank: number;
  first_name: string | null;
  last_name: string | null;
  points: number;
};

export default function Leaderboard() {
  const [data, setData] = useState<UserData | null>(null); // User's rank data
  const [leaderboardData, setLeaderboardData] = useState<LeaderboardEntry[]>(
    []
  ); // Leaderboard data
  const [isLoadingUser, setIsLoadingUser] = useState(true);
  const [isLoadingLeaderboard, setIsLoadingLeaderboard] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response: UserData = await GetUserData();
        setData(response || null);
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setIsLoadingUser(false);
      }
    };

    const fetchLeaderboardData = async () => {
      try {
        const response: LeaderboardEntry[] = await GetLbData();
        setLeaderboardData(response || []);
      } catch (error) {
        console.error("Error fetching leaderboard data:", error);
      } finally {
        setIsLoadingLeaderboard(false);
      }
    };

    fetchUserData();
    fetchLeaderboardData();
  }, []);

  const getRankColor1 = (rank: number): string => {
    if (rank === 1) return "text-yellow-600";
    if (rank === 2) return "text-gray-500";
    if (rank === 3) return "text-orange-500";
    return "text-black"; // Default color for other ranks
  };

  const getOrdinalSuffix = (rank: number): string => {
    const lastDigit = rank % 10;
    const lastTwoDigits = rank % 100;

    if (lastTwoDigits >= 11 && lastTwoDigits <= 13) return "th";
    if (lastDigit === 1) return "st";
    if (lastDigit === 2) return "nd";
    if (lastDigit === 3) return "rd";
    return "th";
  };

  return (
    <div className="min-h-screen bg-[#090147] text-white">
      <Navbar />

      {/* Main Leaderboard */}
      <div className="max-w-3xl mx-auto p-8">
        <h1 className="text-2xl font-bold mb-8 text-center">Leaderboard</h1>
        <div className="bg-gray-100 rounded-lg p-6 text-black shadow-md">
          <div className="flex justify-between mb-4">
            <span className="font-bold">Rank</span>
            <span className="font-bold">Username</span>
            <span className="font-bold">Score</span>
          </div>
          <hr className="border-t-2 mb-4" />

          {!isLoadingLeaderboard && leaderboardData.length > 0 ? (
            leaderboardData.map((entry, index) => (
              <div
                key={index}
                className="flex justify-between items-center text-lg mb-2"
              >
                <span className={`${getRankColor1(entry.rank)} font-semibold`}>
                  {entry.rank}
                  {getOrdinalSuffix(entry.rank)}
                </span>
                <span>
                  {entry.User.first_name || "Unknown"}{" "}
                  {entry.User.last_name || ""}
                </span>
                <span>{entry.points}</span>
              </div>
            ))
          ) : (
            <p className="text-center">
              {isLoadingLeaderboard
                ? "Loading leaderboard..."
                : "No data available."}
            </p>
          )}
        </div>
      </div>

      {/* My Leaderboard */}
      <h2 className="text-xl font-bold text-center mt-8">My Rank</h2>
      <div className="max-w-3xl mx-auto p-8">
        <div className="bg-gray-100 rounded-lg p-6 text-black shadow-md">
          {!isLoadingUser && data ? (
            <div className="flex justify-between items-center text-lg mb-2">
              <span className={`font-semibold ${getRankColor1(data.rank)}`}>
                {data.rank
                  ? `${data.rank}${getOrdinalSuffix(data.rank)}`
                  : "N/A"}
              </span>
              <span>
                {data.first_name || "Unknown"} {data.last_name || ""}
              </span>
              <span>{data.points || 0}</span>
            </div>
          ) : (
            <p className="text-center">
              {isLoadingUser ? "Loading your rank..." : "No data available."}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
