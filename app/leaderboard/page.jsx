"use client";
import Navbar from "../component/navbar";
import { GetUserData } from "../lib/API/GetUserAPI";
import { useState, useEffect } from "react";

export default function Leaderboard() {
  const leaderboard = [
    { rank: "1st", username: "username1", score: 4500 },
    { rank: "2nd", username: "username8", score: 4000 },
    { rank: "3rd", username: "username10", score: 3200 },
    { rank: "4th", username: "username2", score: 3000 },
    { rank: "5th", username: "username4", score: 2000 },
    { rank: "6th", username: "username7", score: 1900 },
  ];

  const Myleaderboard = { rank: "10th" };

  const getRankColor = (rank) => {
    if (rank === "1st") return "text-yellow-600";
    if (rank === "2nd") return "text-gray-500";
    if (rank === "3rd") return "text-orange-500";
    return "";
  };

  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await GetUserData();
        if (response) {
          setData(response);
        } else {
          console.error("No data received from GetUserData");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-[#090147] text-white">
      <Navbar />

      {/* Main Leaderboard */}
      <div className="max-w-3xl mx-auto p-8">
        <h1 className="text-2xl font-bold mb-8 text-center">Leaderboard</h1>
        <div className="bg-gray-100 rounded-lg p-6 text-black shadow-md">
          <div className="flex justify-between mb-4">
            <span className="font-bold">username</span>
            <span className="font-bold">score</span>
          </div>
          <hr className="border-t-2 mb-4" />
          {leaderboard.map((entry, index) => (
            <div
              key={index}
              className="flex justify-between items-center text-lg mb-2"
            >
              <span className={`${getRankColor(entry.rank)} font-semibold`}>
                {entry.rank}
              </span>
              <span className={`${getRankColor(entry.rank)}`}>
                {entry.username}
              </span>
              <span className={`${getRankColor(entry.rank)}`}>
                {entry.score}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* My Leaderboard */}
      <h2 className="text-xl font-bold text-center">My Rank</h2>
      <div className="max-w-3xl mx-auto p-8">
        <div className="bg-gray-100 rounded-lg p-6 text-black shadow-md">
          <div className="flex justify-between items-center text-lg mb-2">
            <span className="font-semibold">{Myleaderboard.rank}</span>
            <span>
              {data?.first_name || "Unknown"} {data?.last_name || ""}
            </span>
            <span>{data?.points}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
