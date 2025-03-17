"use client";

import Navbar from "../../component/Navbar/navbar";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { GetAllinfo } from "@/app/lib/API/GetAllinfo";

import { DownloadTeamCSV } from "@/app/lib/API/GetTourListAPI";
import { FaDownload } from "react-icons/fa6";

import { MdDeleteForever } from "react-icons/md";
import { KickAdminTour } from "@/app/lib/API/KickPlayerTour";
import { DelAdminTour } from "@/app/lib/API/DelTeamTour";
import { RxExit } from "react-icons/rx";


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
  const [showPopupKick, setShowPopupKick] = useState(false);
  const [isLoadingKick, setIsLoadingKick] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [showPopupDelTeam, setShowPopupDelTeam] = useState(false);
  const [selectedMemberId, setSelectedMemberId] = useState<number | null>(null);
  const [selectedTeamId, setSelectedTeamId] = useState<number | null>(null);
  const [selectedMemberName, setSelectedMemberName] = useState<string>("");
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

  const handleOpenDeleteTeamPopup = (teamId: number, e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent the click from triggering the team click
    setSelectedTeamId(teamId);
    setShowPopupDelTeam(true);
  };

  const handleDeleteTeam = async () => {
    try {
      setSuccessMessage(null);
      setErrorMessage(null);

      if (tournamentId !== null && selectedTeamId !== null) {
        console.log("Delete team parameters:", {
          selectedTeamId,
          tournamentId,
          tournamentIdType: typeof tournamentId,
        });

        // Explicitly create the data object with correct types
        const data = {
          teamId: Number(selectedTeamId),
          tournamentId: Number(tournamentId),
        };

        console.log("Sending data to API:", data);

        const result = await DelAdminTour(data);
        console.log("API result:", result);

        if (result && result.status === 200) {
          // Remove the deleted team from the state
          setTeamLeaderboardData((prev) =>
            prev.filter((team) => team.teamID !== selectedTeamId)
          );

          setSuccessMessage("Team deleted successfully!");
        } else {
          setErrorMessage("Failed to delete team. Please try again.");
        }
      }
    } catch (error) {
      console.error("Error in component when deleting team:", error);
      setErrorMessage("An error occurred while deleting the team.");
    } finally {
      setShowPopupDelTeam(false);
    }
  };

  const handleOpenKickPopup = (member: Member, teamId: number) => {
    if (member.isLeader) {
      setErrorMessage("Team leaders cannot be kicked from the team.");
      setTimeout(() => {
        setErrorMessage(null);
      }, 3000);
      return;
    }

    setSelectedMemberId(member.userId);
    setSelectedTeamId(teamId);
    setSelectedMemberName(`${member.firstName} ${member.lastName}`);
    setShowPopupKick(true);
  };

  const handleKickPlayer = async () => {
    try {
      setIsLoadingKick(true);
      setSuccessMessage(null);
      setErrorMessage(null);

      if (
        tournamentId !== null &&
        selectedMemberId !== null &&
        selectedTeamId !== null
      ) {
        console.log("Kick player parameters:", {
          selectedMemberId,
          selectedTeamId,
          tournamentId,
        });

        // Updated to use correct parameter names matching the API requirements
        const data = {
          memberIdToKick: String(selectedMemberId), // userId from members array as string
          teamId: Number(selectedTeamId), // Using teamID (capitalized) instead of teamId
        };

        console.log("Sending kick player data to API:", data);

        const result = await KickAdminTour(data);
        console.log("Kick player API result:", result);

        if (result && result.status === 200) {
          // Update the team data by removing the kicked player
          setTeamLeaderboardData((prev) =>
            prev.map((team) => {
              if (team.teamID === selectedTeamId) {
                return {
                  ...team,
                  members: team.members.filter(
                    (member) => member.userId !== selectedMemberId
                  ),
                };
              }
              return team;
            })
          );

          setSuccessMessage(
            `Player ${selectedMemberName} kicked successfully!`
          );
        } else {
          setErrorMessage("Failed to kick player. Please try again.");
        }
      }
    } catch (error) {
      console.error("Error in component when kicking player:", error);
      setErrorMessage("An error occurred while kicking the player.");
    } finally {
      setShowPopupKick(false);
      setIsLoadingKick(false);
    }
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

      {successMessage && (
        <div className="mx-auto max-w-5xl p-4 bg-green-500 text-white rounded-md mb-4">
          {successMessage}
        </div>
      )}

      {errorMessage && (
        <div className="mx-auto max-w-5xl p-4 bg-red-500 text-white rounded-md mb-4">
          {errorMessage}
        </div>
      )}

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

                  <span>
                    <button
                      onClick={(e) => handleOpenDeleteTeamPopup(team.teamID, e)}
                      className="text-red-500 ml-4 px-4 py-2 text-2xl hover:text-red-700"
                    >
                      <MdDeleteForever />
                    </button>
                  </span>
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
                      <span className="text-[#00ffcc]">Action</span>
                    </div>
                    <hr className="border-t-2 border-[#2a2f62] mb-4" />
                    {team.members.length > 0 ? (
                      team.members.map((member, memberIndex) => (
                        <div
                          key={member.userId}
                          className={`flex justify-between items-center p-3 rounded-lg transition-all hover:bg-[#1c2252] ${
                            member.isLeader ? "" : "cursor-pointer"
                          }`}
                        >
                          <span className="text-white">
                            #{memberIndex + 1} {member.firstName}{" "}
                            {member.lastName}
                            {member.isLeader && (
                              <span className="ml-2 text-yellow-400">
                                (Leader)
                              </span>
                            )}
                          </span>
                          <span className="font-mono text-[#00ffcc]">
                            {member.individualScore.toLocaleString()}
                          </span>
                          <span>
                            <button
                              onClick={() =>
                                handleOpenKickPopup(member, team.teamID)
                              }
                              title={
                                member.isLeader
                                  ? "Team leader cannot be kicked"
                                  : "Click to kick this player"
                              }
                              className="bg-red-500 text-black ml-4 px-2 py-2 text-xl hover:bg-red-700 rounded-md"
                            >
                              <RxExit />
                            </button>
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

      {/* Delete Team Confirmation Popup */}
      {showPopupDelTeam && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-gray-800 p-8 rounded-lg max-w-md w-full">
            <h2 className="text-xl font-bold mb-4 text-white">
              Confirm Delete
            </h2>
            <p className="mb-6 text-gray-300">
              Are you sure you want to delete this team? This action cannot be
              undone.
            </p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setShowPopupDelTeam(false)}
                className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteTeam}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Kick Player Confirmation Popup */}
      {showPopupKick && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-gray-800 p-8 rounded-lg max-w-md w-full">
            <h2 className="text-xl font-bold mb-4 text-white">
              Confirm Player Removal
            </h2>
            <p className="mb-6 text-gray-300">
              Are you sure you want to kick{" "}
              <span className="font-bold text-white">{selectedMemberName}</span>{" "}
              from the team? This action cannot be undone.
            </p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setShowPopupKick(false)}
                className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
                disabled={isLoadingKick}
              >
                Cancel
              </button>
              <button
                onClick={handleKickPlayer}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                disabled={isLoadingKick}
              >
                {isLoadingKick ? "Processing..." : "Kick Player"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
