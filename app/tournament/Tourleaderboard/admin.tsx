"use client";

import Navbar from "../../component/Navbar/navbar";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { GetAllinfo } from "@/app/lib/API/GetAllinfo";
import { DownloadTeamCSV } from "@/app/lib/API/GetTourListAPI";
import { FaDownload } from "react-icons/fa6";

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
  const [openedIndexes, setOpenedIndexes] = useState<number[]>([]); // Track open cards

  const handleDownloadCSV = async () => {
    DownloadTeamCSV(Number(tournamentId));
  };

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

  const handleTeamClick = (index: number) => {
    setOpenedIndexes((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  return (
    <div className="min-h-screen text-white">
      <Navbar />

      <div className="flex justify-between items-center p-6">
        <button
          className="p-3 text-md text-black border-2 border-green-500 bg-green-500 rounded-md ml-[85%] hover:bg-green-600 transition-all duration-200"
          onClick={handleDownloadCSV}
        >
          <div className="flex items-center text-md space-x-2">
            <FaDownload /> <div>Export to CSV</div>
          </div>
        </button>
        <button
          onClick={() => window.history.back()}
          className="text-xl text-green-300 hover:underline ml-auto"
        >
          Back →
        </button>
      </div>

      {/* Tournament Leaderboard */}
      <div className="max-w-5xl mx-auto p-8">
        <h1 className="text-2xl font-bold mb-8 text-center text-green-600">
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
                  className={`cursor-pointer bg-gray-900 rounded-lg p-6 text-green-500 shadow-md flex justify-between items-center hover:bg-gray-700 border-green-500 border-2 ${
                    openedIndexes.includes(index) ? "bg-gray-700" : ""
                  }`}
                  onClick={() => handleTeamClick(index)}
                >
                  <div className="flex-1 font-bold text-left">{index + 1}</div>
                  <div className="flex-1 font-bold text-center">
                    {team.teamName}
                  </div>
                  <div className="flex-1 font-bold text-right">
                    {team.totalPoints}
                  </div>
                  <span className="text-green-500 ml-2">→</span>
                </div>

                {/* Team Leaderboard appears here if this card is selected */}
                {openedIndexes.includes(index) && (
                  <div className="bg-[#151a3d]/90 backdrop-blur-sm rounded-xl p-6 shadow-xl border border-[#2a2f62] mt-4">
                    <h2 className="text-xl font-semibold mb-6 text-center text-[#00ffcc]">
                      Our Team Leaderboard
                    </h2>
                    <div className="flex justify-between font-semibold text-lg mb-4">
                      <span className="text-[#00ffcc]">Member</span>
                      <span className="text-[#00ffcc]">Score</span>
                    </div>
                    <hr className="border-t-2 border-[#2a2f62] mb-4" />
                    {team.members.length > 0 ? (
                      team.members.map((member, memberIndex) => (
                        <div
                          key={member.userId}
                          className="flex justify-between items-center p-3 rounded-lg transition-all hover:bg-[#1c2252]"
                        >
                          <span className="text-white">
                            #{memberIndex + 1} {member.firstName}{" "}
                            {member.lastName}
                          </span>
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
