"use client";

import Navbar from "../../component/navbar";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { GetAllinfo } from "@/app/lib/API/GetAllinfo";

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

export default function TeamLeaderboardAdmin() {
  const searchParams = useSearchParams();
  const tournamentId = searchParams.get("tournamentId");

  const [teamLeaderboardData, setTeamLeaderboardData] = useState<
    TeamLeaderboardData[]
  >([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedTeam, setSelectedTeam] = useState<TeamLeaderboardData | null>(
    null
  );
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

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

  const handleTeamClick = (team: TeamLeaderboardData, index: number) => {
    setSelectedTeam(team);
    setSelectedIndex(index);
  };

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
      <div className="max-w-5xl mx-auto p-8">
        <h1 className="text-2xl font-bold mb-8 text-center">
          Tournament Admin Leaderboard
        </h1>

        <div className="space-y-4 w-full">
          <div className="rounded-lg p-6 text-black shadow-md flex justify-between items-center">
            <div className="flex-1 font-bold text-left text-white text-xl">
              Rank
            </div>
            <div className="flex-1 text-center font-bold text-white text-xl">
              Team
            </div>
            <div className="flex-1 text-right font-bold text-white text-xl">
              Total Points
            </div>
          </div>
          {!isLoading && teamLeaderboardData.length > 0 ? (
            teamLeaderboardData.map((team, index) => (
              <div key={team.teamID}>
                <div
                  className="cursor-pointer bg-gray-200 rounded-lg p-6 text-black shadow-md flex justify-between items-center hover:bg-gray-300"
                  onClick={() => handleTeamClick(team, index)}
                >
                  <div className="flex-1 font-bold text-left">{index + 1}</div>
                  <div className="flex-1 font-bold text-center">
                    {team.teamName}
                  </div>
                  <div className="flex-1  font-bold text-right">
                    {team.totalPoints}
                  </div>
                  <span className="text-green-500 ml-2">→</span>
                </div>

                {/* Our Team Leaderboard appears here if this card is selected */}
                {selectedIndex === index && selectedTeam && (
                  <div className="bg-white text-black rounded-lg shadow-md p-6 mt-4">
                    <h2 className="text-xl font-bold mb-4 text-center text-green-600">
                      Our Team Leaderboard
                    </h2>
                    <div className="flex justify-between font-bold text-lg mb-4">
                      <span className="text-green-600">Member</span>
                      <span className="text-red-500">Score</span>
                    </div>
                    <hr className="border-t-2 mb-4" />
                    {selectedTeam.members.length > 0 ? (
                      selectedTeam.members.map((member, memberIndex) => (
                        <div
                          key={member.userId}
                          className="flex justify-between items-center text-lg mb-2"
                        >
                          <span>
                            {memberIndex + 1}. {member.firstName}{" "}
                            {member.lastName}
                          </span>
                          <span className="text-red-500">
                            {member.individualScore}
                          </span>
                        </div>
                      ))
                    ) : (
                      <div className="text-center text-gray-500">
                        No member data available.
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))
          ) : (
            <p className="text-center">
              {isLoading ? "Loading leaderboard..." : "No team data available."}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
