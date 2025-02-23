"use client";

import Navbar from "../../component/Navbar/navbar";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { GetAllinfo } from "@/app/lib/API/GetAllinfo";
import { FaTrophy, FaUsers, FaArrowLeft, FaMedal } from "react-icons/fa";

type Member = {
  userId: string; // Changed to string based on API response
  isLeader: boolean;
  firstName: string;
  lastName: string;
  individualScore: number;
};

type TeamLeaderboardData = {
  teamID: number;
  teamName: string;
  totalPoints: number;
  rank: number;
  members: Member[];
};

export default function TeamLeaderboardAdmin() {
  const searchParams = useSearchParams();
  const tournamentId = searchParams.get("tournamentId");
  const [teamLeaderboardData, setTeamLeaderboardData] = useState<
    TeamLeaderboardData[]
  >([]);
  const [currentTeamId, setCurrentTeamId] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchTeamLeaderboardData = async () => {
      try {
        if (!tournamentId) return;
        const response = await GetAllinfo(Number(tournamentId));
        setTeamLeaderboardData(response);

        // Get the user's team ID from your authentication context or API
        // For now, I'll use the first team's ID as an example
        // You should replace this with actual logic to get the current user's team
        if (response && response.length > 0) {
          setCurrentTeamId(response[0].teamID);
        }
      } catch (error) {
        console.error("Error fetching leaderboard data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTeamLeaderboardData();
  }, [tournamentId]);

  const getCurrentTeam = () => {
    return teamLeaderboardData.find((team) => team.teamID === currentTeamId);
  };

  const getRankIcon = (rank: number) => {
    if (rank === 1) return <FaTrophy className="text-yellow-400 w-5 h-5" />;
    if (rank === 2) return <FaMedal className="text-gray-300 w-5 h-5" />;
    if (rank === 3) return <FaMedal className="text-amber-600 w-5 h-5" />;
    return null;
  };

  const currentTeam = getCurrentTeam();

  return (
    <div className="min-h-screen">
      <Navbar />

      <div className="max-w-6xl mx-auto px-4 py-6">
        <button
          onClick={() => window.history.back()}
          className="flex items-center gap-2 text-[#00ffcc] hover:text-[#00ffcc]/80 transition-colors mb-8"
        >
          <FaArrowLeft /> Back
        </button>

        {/* Tournament Leaderboard */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-8 text-center text-[#00ffcc]">
            Tournament Leaderboard
          </h1>

          <div className="bg-[#151a3d]/90 backdrop-blur-sm rounded-xl p-6 shadow-xl border border-[#2a2f62]">
            <div className="flex justify-between mb-6 text-sm uppercase tracking-wider text-gray-400">
              <span>Rank</span>
              <span>Team Name</span>
              <span>Total Points</span>
            </div>

            {!isLoading && teamLeaderboardData.length > 0 ? (
              <div className="space-y-4">
                {teamLeaderboardData.map((team, index) => (
                  <div
                    key={team.teamID}
                    className="flex justify-between items-center p-3 rounded-lg transition-all hover:bg-[#1c2252]"
                  >
                    <div className="flex items-center gap-2">
                      {getRankIcon(index + 1)}
                      <span className="font-semibold text-white">
                        {index + 1}
                      </span>
                    </div>
                    <span className="font-medium text-gray-200">
                      {team.teamName}
                    </span>
                    <span className="font-mono text-[#00ffcc]">
                      {team.totalPoints.toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-400">
                {isLoading
                  ? "Loading leaderboard..."
                  : "No team data available."}
              </div>
            )}
          </div>
        </div>

        {/* Our Team Section */}
        <div className="space-y-8">
          <h2 className="text-3xl font-bold text-center text-white">
            Your Team Stats
          </h2>

          {/* Team Overview */}
          <div className="bg-[#151a3d]/90 backdrop-blur-sm rounded-xl p-6 shadow-xl border border-[#2a2f62]">
            {currentTeam ? (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-2xl font-bold text-[#00ffcc] mb-2">
                      {currentTeam.teamName}
                    </h3>
                    <div className="flex items-center gap-2 text-gray-400">
                      <FaUsers />
                      <span>{currentTeam.members.length} Members</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-gray-400">Total Points</div>
                    <div className="font-mono text-[#00ffcc]">
                      {currentTeam.totalPoints.toLocaleString()}
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center text-gray-400">
                No team data available.
              </div>
            )}
          </div>

          {/* Members List */}
          <div className="bg-[#151a3d]/90 backdrop-blur-sm rounded-xl p-6 shadow-xl border border-[#2a2f62]">
            <h3 className="text-xl font-semibold mb-6 text-white">
              Team Members
            </h3>

            <div className="space-y-4">
              {currentTeam && currentTeam.members.length > 0 ? (
                currentTeam.members.map((member, index) => (
                  <div
                    key={member.userId}
                    className="flex justify-between items-center p-3 rounded-lg transition-all hover:bg-[#1c2252]"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-gray-400">#{index + 1}</span>
                      <span className="text-white">
                        {member.firstName} {member.lastName}
                      </span>
                      {member.isLeader && (
                        <span className="px-2 py-1 text-xs bg-[#00ffcc]/20 text-[#00ffcc] rounded-full">
                          Leader
                        </span>
                      )}
                    </div>
                    <span className="font-mono text-[#00ffcc]">
                      {member.individualScore.toLocaleString()}
                    </span>
                  </div>
                ))
              ) : (
                <div className="text-center text-gray-400">
                  No member data available.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
