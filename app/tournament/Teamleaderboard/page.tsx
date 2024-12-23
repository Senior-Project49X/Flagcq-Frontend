"use client";
import Navbar from "../../component/navbar";
import { useState, useEffect } from "react";
import { GetLbTeamTourData } from "../../lib/API/GetLbTeamTourAPI";

export default function TeamLeaderboard() {
  const [teamLeaderboardData, setTeamLeaderboardData] = useState<{
    team_name: string;
    members: {
      team_name: string;
      total_score: string;
      rank: string;
      first_name: string;
      last_name: string;
      points: string;
    }[];
    total_points: string;
    rank: string;
  } | null>(null); // Leaderboard data

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchLeaderboardData = async () => {
      try {
        const response = await GetLbTeamTourData("1", "1");
        console.log("Leaderboard data:", response); // Debugging the response

        setTeamLeaderboardData(response);
      } catch (error) {
        console.error("Error fetching leaderboard data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchLeaderboardData();
  }, []); // Dependency array ensures this runs once on mount

  return (
    <div className="min-h-screen bg-[#090147] text-white">
      <Navbar />

      {/* Main Leaderboard */}
      <div className="max-w-3xl mx-auto p-8">
        <h1 className="text-2xl font-bold mb-8 text-center">
          Tournament Leaderboard
        </h1>
        <h2 className="text-xl mb-8 text-center">Linux for CPE 2025</h2>

        {isLoading ? (
          <div className="text-center">Loading...</div>
        ) : teamLeaderboardData ? (
          <>
            {/* Team Information */}
            <div className="bg-gray-100 rounded-lg p-6 text-black shadow-md mb-6">
              <div className="mb-4">
                <span className="font-semibold text-xl">
                  Team: {teamLeaderboardData.team_name}
                </span>
              </div>
              <div className="mb-2">
                <span className="font-medium">
                  {teamLeaderboardData.rank} place
                </span>
              </div>
              <div>
                <span>{teamLeaderboardData.total_points} points</span>
              </div>
            </div>

            {/* Members List */}
            <div className="bg-gray-100 rounded-lg p-6 text-black shadow-md">
              <div className="flex justify-between mb-4">
                <span className="font-bold">Member</span>
                <span className="font-bold">Score</span>
              </div>
              <hr className="border-t-2 mb-4" />
              {teamLeaderboardData.members &&
              teamLeaderboardData.members.length > 0 ? (
                teamLeaderboardData.members.map((entry, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center text-lg mb-2"
                  >
                    <span>
                      {entry.first_name} {entry.last_name}
                    </span>
                    <span>{entry.points}</span>
                  </div>
                ))
              ) : (
                <div className="text-center text-gray-600">
                  No team members found.
                </div>
              )}
            </div>
          </>
        ) : (
          <div className="text-center">Error fetching data.</div>
        )}
      </div>
    </div>
  );
}
