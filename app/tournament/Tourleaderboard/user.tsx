"use client";

import Navbar from "../../component/Navbar/navbar";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { GetmyTeamInfo, GetAllinfo } from "@/app/lib/API/GetAllinfo";
import { FaTrophy, FaUsers, FaArrowLeft, FaMedal } from "react-icons/fa";

type Member = {
  userId: string;
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

export default function TeamLeaderboardUser() {
  const searchParams = useSearchParams();
  const tournamentId = searchParams.get("tournamentId");
  const [teamData, setTeamData] = useState<TeamLeaderboardData | null>(null);
  const [allTeams, setAllTeams] = useState<TeamLeaderboardData[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchTeamLeaderboardData = async () => {
      try {
        if (!tournamentId) {
          setIsLoading(false);
          return;
        }
        const response = await GetmyTeamInfo(Number(tournamentId));
        console.log("My Team API Response:", response);

        if (response && response.teamID) {
          const formattedData: TeamLeaderboardData = {
            teamID: response.teamID,
            teamName: response.teamName,
            totalPoints: response.totalPoints || 0,
            rank: response.rank || 0,
            members: Array.isArray(response.members)
              ? response.members.map((member: any) => ({
                  userId: member.userId || "",
                  isLeader: member.isLeader || false,
                  firstName: member.firstName || "",
                  lastName: member.lastName || "",
                  individualScore: member.individualScore || 0,
                }))
              : [],
          };
          setTeamData(formattedData);
        }
      } catch (error) {
        console.error("Error fetching team data:", error);
      }
    };

    const fetchAllTeams = async () => {
      try {
        if (!tournamentId) {
          setIsLoading(false);
          return;
        }
        const response = await GetAllinfo(Number(tournamentId));
        console.log("All Teams API Response:", response);

        if (Array.isArray(response)) {
          const formattedTeams = response.map((team: any) => ({
            teamID: team.teamID,
            teamName: team.teamName,
            totalPoints: team.totalPoints || 0,
            rank: team.rank || 0,
            members: Array.isArray(team.members)
              ? team.members.map((member: any) => ({
                  userId: member.userId || "",
                  isLeader: member.isLeader || false,
                  firstName: member.firstName || "",
                  lastName: member.lastName || "",
                  individualScore: member.individualScore || 0,
                }))
              : [],
          }));

          // Sort teams by total points in descending order
          formattedTeams.sort((a, b) => b.totalPoints - a.totalPoints);
          setAllTeams(formattedTeams);
        }
      } catch (error) {
        console.error("Error fetching all teams data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTeamLeaderboardData();
    fetchAllTeams();
  }, [tournamentId]);

  const getRankIcon = (rank: number) => {
    if (rank === 1) return <FaTrophy className="text-yellow-400 w-5 h-5" />;
    if (rank === 2) return <FaMedal className="text-gray-300 w-5 h-5" />;
    if (rank === 3) return <FaMedal className="text-amber-600 w-5 h-5" />;
    return null;
  };

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

            {!isLoading && allTeams.length > 0 ? (
              <div className="space-y-4">
                {allTeams.map((team, index) => (
                  <div
                    key={team.teamID}
                    className={`flex justify-between items-center p-3 rounded-lg transition-all hover:bg-[#1c2252] ${
                      teamData && team.teamID === teamData.teamID
                        ? "bg-[#1c2252] border border-[#00ffcc]/30"
                        : ""
                    }`}
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
                {isLoading ? "Loading leaderboard..." : "No teams available."}
              </div>
            )}
          </div>
        </div>

        <div className="space-y-8">
          <h2 className="text-3xl font-bold text-center text-white">
            Your Team Stats
          </h2>

          <div className="bg-[#151a3d]/90 backdrop-blur-sm rounded-xl p-6 shadow-xl border border-[#2a2f62]">
            {teamData ? (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-2xl font-bold text-[#00ffcc] mb-2">
                      {teamData.teamName}
                    </h3>
                    <span className="flex items-center gap-2 text-gray-400">
                      <FaUsers />
                      <span>{teamData.members.length} Members</span>
                    </span>
                  </div>
                  <div className="text-right">
                    <div className="font-mono text-md text-gray-400 mb-5">
                      TOTAL POINTS
                    </div>
                    <div className="font-mono text-[#00ffcc] mr-3">
                      {teamData.totalPoints.toLocaleString()}
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

          <div className="bg-[#151a3d]/90 backdrop-blur-sm rounded-xl p-6 shadow-xl border border-[#2a2f62]">
            <h3 className="text-xl font-semibold mb-6 text-white">
              Team Members
            </h3>

            <div className="space-y-4">
              {teamData && teamData.members.length > 0 ? (
                teamData.members.map((member, index) => (
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
