"use client";
import Navbar from "../../component/navbar";

export default function TeamLeaderboard() {
  // Consolidated leaderboard data
  const Tourleaderboard = [
    { username: "team1", score: 4500 },
    { username: "team8", score: 4000 },
    { username: "team10", score: 3200 },
  ];

  const Team = { team: "team1", rank: "1st", score: 4500 };

  // Function to determine the color based on rank

  return (
    <div className="min-h-screen bg-[#090147] text-white">
      <Navbar />

      {/* Main Leaderboard */}
      <div className="max-w-3xl mx-auto p-8">
        <h1 className="text-2xl font-bold mb-8 text-center">
          Tournament Leaderboard
        </h1>
        <h1 className="text-2xl font-bold mb-8 text-center">
          Linux for CPE 2025
        </h1>
        <div className="max-w-3xl mx-auto p-8 flex justify-center items-center">
          <div className="bg-gray-100 rounded-lg p-6 text-black shadow-md">
            <div className="mb-4 flex">
              <div className="font-semibold text-xl">Team : {Team.team}</div>
            </div>
            <div className="mb-2">
              <div className="font-medium">{Team.rank} place</div>
            </div>
            <div className="mb-2">
              <div>{Team.score} points</div>
            </div>
          </div>
        </div>

        <br />
        <div className="bg-gray-100 rounded-lg p-6 text-black shadow-md">
          <div className="flex justify-between mb-4">
            <span className="font-bold">Member</span>
            <span className="font-bold">score</span>
          </div>
          <hr className="border-t-2 mb-4" />
          {Tourleaderboard.map((entry, index) => (
            <div
              key={index}
              className="flex justify-between items-center text-lg mb-2"
            >
              <span>{entry.username}</span>
              <span>{entry.score}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
