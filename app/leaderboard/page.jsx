"use client";
import Navbar from "../component/navbar";
import { GetLbData } from "../lib/API/GetLbAPI";
import { GetUserData } from "../lib/API/GetUserAPI";
import { useState, useEffect } from "react";

export default function Leaderboard() {
  const [data, setData] = useState(null); // User's rank data
  const [leaderboardData, setLeaderboardData] = useState([]); // Leaderboard data

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await GetUserData();
        setData(response || null);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    const fetchLeaderboardData = async () => {
      try {
        const response = await GetLbData();
        setLeaderboardData(response || []);
      } catch (error) {
        console.error("Error fetching leaderboard data:", error);
      }
    };

    fetchUserData();
    fetchLeaderboardData();
  }, []);

  const getRankColor1 = (rank) => {
    if (rank === 1) return "text-yellow-600";
    if (rank === 2) return "text-gray-500";
    if (rank === 3) return "text-orange-500";
    return "text-white"; // Default color for other ranks
  };

  const getOrdinalSuffix = (rank) => {
    const lastDigit = parseInt(rank) % 10;
    const lastTwoDigits = parseInt(rank) % 100;

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

          {leaderboardData.length > 0 ? (
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
            <p className="text-center">Loading leaderboard...</p>
          )}
        </div>
      </div>

      {/* My Leaderboard */}
      <h2 className="text-xl font-bold text-center mt-8">My Rank</h2>
      <div className="max-w-3xl mx-auto p-8">
        <div className="bg-gray-100 rounded-lg p-6 text-black shadow-md">
          {data ? (
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
            <p className="text-center">Loading your rank...</p>
          )}
        </div>
      </div>
    </div>
  );
}
