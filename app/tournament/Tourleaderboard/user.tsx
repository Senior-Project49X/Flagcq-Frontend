"use client";

import Navbar from "../../component/Navbar/navbar";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { GetAllinfo } from "@/app/lib/API/GetAllinfo";

// Define types for the leaderboard data
type Member = {
  userId: number;
  isLeader: boolean;
  firstName: string;
  lastName: string;
  individualScore: number;
};

type TeamLeaderboardData = {
  teamName: string;
  teamID: number;
  totalPoints: number;
  members: Member[];
};

// Component
export default function TeamLeaderboardAdmin() {
  const searchParams = useSearchParams();
  const tournamentId = searchParams.get("tournamentId");

  const [teamLeaderboardData, setTeamLeaderboardData] = useState<
    TeamLeaderboardData[]
  >([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchTeamLeaderboardData = async () => {
      try {
        if (!tournamentId) return;
        const response = await GetAllinfo(Number(tournamentId));
        setTeamLeaderboardData(response);
      } catch (error) {
        console.error("Error fetching leaderboard data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTeamLeaderboardData();
  }, [tournamentId]);

  return (
    <div className="min-h-screen bg-[#090147] text-white">
      <Navbar />

      <div className="flex justify-between items-center p-6">
        <button
          onClick={() => window.history.back()}
          className="text-xl text-green-300 hover:underline ml-auto"
        >
          Back →
        </button>
      </div>

      {/* Tournament Leaderboard */}
      <div className="max-w-3xl mx-auto p-8">
        <h1 className="text-2xl font-bold mb-8 text-center">
          Tournament Leaderboard
        </h1>
        <div className="bg-gray-100 rounded-lg p-6 text-black shadow-md">
          <div className="flex justify-between mb-4">
            <span className="font-bold">Rank</span>
            <span className="font-bold">Team Name</span>
            <span className="font-bold">Total Points</span>
          </div>
          <hr className="border-t-2 mb-4" />

          {!isLoading && teamLeaderboardData.length > 0 ? (
            teamLeaderboardData.map((team, index) => (
              <div
                key={team.teamID}
                className="flex justify-between items-center text-lg mb-2"
              >
                <span>{index + 1}</span>
                <span>{team.teamName}</span>
                <span>{team.totalPoints}</span>
              </div>
            ))
          ) : (
            <p className="text-center">
              {isLoading ? "Loading leaderboard..." : "No team data available."}
            </p>
          )}
        </div>
      </div>

      {/* Our Team Leaderboard */}
      <div className="max-w-4xl mx-auto p-6">
        <h1 className="text-2xl font-bold mb-8 text-center">
          Our Team Leaderboard
        </h1>
        <div className="bg-white text-black rounded-lg shadow-md px-4 py-6 mb-6 max-w-[400px] mx-auto">
          {teamLeaderboardData.length > 0 ? (
            <>
              <h2 className="text-xl sm:text-2xl font-bold text-center mb-4">
                Team {teamLeaderboardData[0]?.teamName || "N/A"}
              </h2>
              <div className="text-center text-base sm:text-lg mb-4">
                Rank: {teamLeaderboardData.length > 0 ? 1 : "N/A"}
              </div>
              <div className="text-center text-lg sm:text-xl font-semibold text-green-600">
                Total Points: {teamLeaderboardData[0]?.totalPoints || "0"}
              </div>
            </>
          ) : (
            <div className="text-center text-gray-500">
              No team data available.
            </div>
          )}
        </div>

        {/* Members List */}
        <div className="bg-white text-black rounded-lg shadow-md p-6">
          <div className="flex justify-between font-bold text-lg mb-4">
            <span className="text-green-600">Member</span>
            <span className="text-red-500">Score</span>
          </div>
          <hr className="border-t-2 mb-4" />
          {teamLeaderboardData.length > 0 &&
          teamLeaderboardData[0]?.members?.length ? (
            teamLeaderboardData[0].members.map((member, index) => (
              <div
                key={member.userId}
                className="flex justify-between items-center text-lg mb-2"
              >
                <span>
                  {index + 1}. {member.firstName} {member.lastName}
                </span>
                <span className="text-red-500">{member.individualScore}</span>
              </div>
            ))
          ) : (
            <div className="text-center text-gray-500">
              No member data available.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
