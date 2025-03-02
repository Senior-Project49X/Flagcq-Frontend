"use client";

import Navbar from "../component/Navbar/navbar";
import { GetLbData } from "../lib/API/GetLbAPI";
import { GetUserData } from "../lib/API/GetUserAPI";
import { useState, useEffect } from "react";
import { FaCrown, FaMedal, FaTrophy } from "react-icons/fa";

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
  const [data, setData] = useState<UserData | null>(null);
  const [leaderboardData, setLeaderboardData] = useState<LeaderboardEntry[]>(
    []
  );
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

  const getOrdinalSuffix = (rank: number): string => {
    const lastDigit = rank % 10;
    const lastTwoDigits = rank % 100;

    if (lastTwoDigits >= 11 && lastTwoDigits <= 13) return "th";
    if (lastDigit === 1) return "st";
    if (lastDigit === 2) return "nd";
    if (lastDigit === 3) return "rd";
    return "th";
  };

  const getRankIcon = (rank: number) => {
    if (rank === 1) return <FaCrown className="w-6 h-6 text-yellow-400" />;
    if (rank === 2) return <FaMedal className="w-6 h-6 text-gray-300" />;
    if (rank === 3) return <FaMedal className="w-6 h-6 text-amber-600" />;
    return <FaTrophy className="w-5 h-5 text-emerald-500 opacity-50" />;
  };

  const LoadingSpinner = () => (
    <div className="flex items-center justify-center gap-2">
      <div className="w-2 h-2 bg-emerald-400 rounded-full animate-bounce" />
      <div className="w-2 h-2 bg-emerald-400 rounded-full animate-bounce delay-100" />
      <div className="w-2 h-2 bg-emerald-400 rounded-full animate-bounce delay-200" />
    </div>
  );

  return (
    <div className="min-h-screen">
      <Navbar />

      <div className="max-w-4xl mx-auto p-4 md:p-8">
        {/* My Rank */}
        <div className="mt-8">
          <h2 className="text-2xl font-bold text-center mb-6 text-white">
            Your Ranking
          </h2>

          <div className="bg-[#151a3d]/90 backdrop-blur-sm rounded-xl p-6 shadow-xl border border-[#2a2f62]">
            {!isLoadingUser && data ? (
              <div className="flex justify-between items-center p-3">
                <div className="flex items-center gap-2">
                  {getRankIcon(data.rank)}
                  <span className="font-semibold text-white">
                    {data.rank
                      ? `${data.rank}${getOrdinalSuffix(data.rank)}`
                      : "N/A"}
                  </span>
                </div>

                <span className="font-medium text-gray-200">
                  {data.first_name || "Unknown"} {data.last_name || ""}
                </span>

                <span className="font-mono text-emerald-400">
                  {(data.points || 0).toLocaleString()}
                </span>
              </div>
            ) : (
              <div className="text-center py-4 text-gray-400">
                {isLoadingUser ? <LoadingSpinner /> : "No data available."}
              </div>
            )}
          </div>
        </div>
        {/* Main Leaderboard */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold mt-6 mb-6 text-center bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-cyan-400">
            Global Leaderboard
          </h1>

          <div className="bg-[#151a3d]/90 backdrop-blur-sm rounded-xl p-6 shadow-xl border border-[#2a2f62]">
            <div className="flex justify-between mb-6 text-sm uppercase tracking-wider text-gray-400">
              <span>Rank</span>
              <span>Player</span>
              <span>Score</span>
            </div>

            {!isLoadingLeaderboard && leaderboardData.length > 0 ? (
              <div className="space-y-4">
                {leaderboardData.map((entry, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center p-3 rounded-lg transition-all hover:bg-gray-700/50"
                  >
                    <div className="flex items-center gap-2">
                      {getRankIcon(entry.rank)}
                      <span className="font-semibold text-white">
                        {entry.rank}
                        {getOrdinalSuffix(entry.rank)}
                      </span>
                    </div>

                    <span className="font-medium text-gray-200">
                      {entry.User.first_name || "Unknown"}{" "}
                      {entry.User.last_name || ""}
                    </span>

                    <span className="font-mono text-emerald-400">
                      {entry.points.toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-400">
                {isLoadingLeaderboard ? (
                  <LoadingSpinner />
                ) : (
                  "No data available."
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
