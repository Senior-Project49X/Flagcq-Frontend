"use client";
import Navbar from "../../component/navbar";

export default function TourLeaderboard() {
  // Consolidated leaderboard data
  const Tourleaderboard = [
    { rank: "1st", username: "team1", score: 4500 },
    { rank: "2nd", username: "team8", score: 4000 },
    { rank: "3rd", username: "team10", score: 3200 },
    { rank: "4th", username: "team2", score: 3000 },
    { rank: "5th", username: "team4", score: 2000 },
    { rank: "6th", username: "team7", score: 1900 },
  ];

  const Myleaderboard = { rank: "10th", username: "My team", score: 1000 };

  // Function to determine the color based on rank
  const getRankColor = (rank: string) => {
    if (rank === "1st") return "text-yellow-600";
    if (rank === "2nd") return "text-gray-500";
    if (rank === "3rd") return "text-orange-500";
    return "";
  };

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
        <div className="bg-gray-100 rounded-lg p-6 text-black shadow-md">
          <div className="flex justify-between mb-4">
            <span className="font-bold">Team</span>
            <span className="font-bold">score</span>
          </div>
          <hr className="border-t-2 mb-4" />
          {Tourleaderboard.map((entry, index) => (
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
      <h2 className="text-xl font-bold  text-center">My Team</h2>
      <div className="max-w-3xl mx-auto p-8">
        <div className="bg-gray-100 rounded-lg p-6 text-black shadow-md">
          <div className="flex justify-between items-center text-lg mb-2">
            <span className="font-semibold">{Myleaderboard.rank}</span>
            <span>{Myleaderboard.username}</span>
            <span>{Myleaderboard.score}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
