"use client";

import React, { FormEvent, useState, useEffect } from "react";
import { PostCreateTeam } from "../lib/API/GetCreateTeam";
import {
  FaTrash,
  FaEdit,
  FaEye,
  FaExclamationTriangle,
  FaRegCopy,
} from "react-icons/fa";
import { isRoleAdmin } from "../lib/role";
import { DeleteTour } from "../lib/API/DelTourAPI";
import { useRouter } from "next/navigation";

type ModalDetail = {
  ClosePopup: () => void;
  Topic: string;
  Detail: string;
  tournament_id: number;
  joinCode: string;
};

export default function EnrollModal({
  ClosePopup,
  Topic,
  Detail,
  tournament_id,
  joinCode,
}: ModalDetail) {
  const [teamName, setTeamName] = useState("");
  const [isLoadingCreate, setIsLoadingCreate] = useState(false);
  const [isLoadingDelete, setIsLoadingDelete] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const truncatedTopic = Topic.length > 30 ? `${Topic.slice(0, 25)}...` : Topic;
  const router = useRouter();

  // Check if the user is an admin
  useEffect(() => {
    setIsAdmin(isRoleAdmin());
  }, []);

  // Create a team
  const handleCreate = async (e: FormEvent) => {
    e.preventDefault();
    try {
      setIsLoadingCreate(true);
      setSuccessMessage(null);
      const teamData = await PostCreateTeam({ name: teamName, tournament_id });
      setSuccessMessage("Team created successfully!");
      router.push(
        `/tournament/Tourteam_member?teamId=${teamData.team.id}&tournamentId=${teamData.team.tournament_id}`
      );
    } catch (error) {
      console.error("Error creating team:", error);
    } finally {
      setIsLoadingCreate(false);
    }
  };

  const handleAdminRoute = () => {
    router.push(`/tournament/TournamentPage?tournamentId=${tournament_id}`);
  };

  const handleEditTour = () => {
    console.log("Navigating to /admin/EditTournament");
    router.push(`/admin/EditTournament?TournamentID=${tournament_id}`);
  };

  // Delete the tournament
  const handleDeleteTournament = async () => {
    try {
      setIsLoadingDelete(true);
      setSuccessMessage(null);
      await DeleteTour(tournament_id);
      setSuccessMessage("Tournament deleted successfully!");
      window.location.reload();
    } catch (error) {
      console.error("Error deleting tournament:", error);
    } finally {
      setIsLoadingDelete(false);
      setShowConfirmDelete(false);
    }
  };

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-75 backdrop-blur-sm z-40"></div>
      <div
        className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
        onMouseDown={ClosePopup}
      >
        <div
          className="relative w-full max-w-lg mx-4 bg-gray-800 rounded-xl shadow-2xl border border-gray-700"
          onMouseDown={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-700">
            <h3 className="text-xl font-bold text-green-400">
              {truncatedTopic}
            </h3>
            <button
              className="text-gray-400 hover:text-white text-2xl transition-colors"
              onClick={ClosePopup}
            >
              &times;
            </button>
          </div>

          {/* Content */}
          <div className="px-6 py-6">
            <h4 className="text-center text-lg font-semibold mb-6 text-white">
              Detail
            </h4>
            <div className="text-center mb-8">
              <div
                className="text-gray-300 text-lg leading-relaxed break-words rich-text  p-4 rounded-lg"
                dangerouslySetInnerHTML={{
                  __html: Detail ?? "",
                }}
              />
            </div>

            {isAdmin ? (
              <div className="flex flex-col gap-4">
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <button
                    onClick={() => setShowConfirmDelete(true)}
                    className="flex items-center justify-center gap-2 px-4 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all duration-300 transform hover:scale-105"
                  >
                    <FaTrash /> Delete
                  </button>
                  <button
                    onClick={handleEditTour}
                    className="flex items-center justify-center gap-2 px-4 py-3 bg-yellow-500 text-gray-900 rounded-lg hover:bg-yellow-600 transition-all duration-300 transform hover:scale-105"
                  >
                    <FaEdit /> Edit
                  </button>
                </div>
                <button
                  onClick={handleAdminRoute}
                  className="flex items-center justify-center gap-2 px-4 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-all duration-300 transform hover:scale-105"
                >
                  <FaEye /> View Tournament
                </button>
              </div>
            ) : (
              <div className="flex flex-col items-center">
                <h5 className="text-lg font-bold mb-4 text-white">
                  Create new team
                </h5>
                <form onSubmit={handleCreate} className="w-full">
                  <input
                    type="text"
                    placeholder="Team Name"
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg mb-4 text-white placeholder-gray-400 focus:outline-none focus:border-green-400"
                    maxLength={50}
                    value={teamName}
                    onChange={(e) => setTeamName(e.target.value)}
                  />
                  <button
                    type="submit"
                    className="w-full bg-green-500 text-white py-3 rounded-lg hover:bg-green-600 transition-all duration-300 transform hover:scale-105 disabled:opacity-50"
                    disabled={isLoadingCreate}
                  >
                    {isLoadingCreate ? "Creating..." : "Create"}
                  </button>
                </form>
              </div>
            )}

            {joinCode && (
              <div className="mt-6 p-4 bg-[#151a3d]/90 backdrop-blur-sm rounded-lg text-center border border-[#2a2f62]">
                <div className="flex items-center justify-center gap-3">
                  <span className="text-gray-400">Code: </span>
                  <span className="font-mono font-bold text-[#00ffcc]">
                    {joinCode}
                  </span>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(joinCode);
                      // You can add toast notification here if you have one
                    }}
                    className="flex items-center justify-center w-8 h-8 rounded-lg transition-all 
                   hover:bg-[#1c2252] active:scale-95 focus:outline-none focus:ring-2 
                   focus:ring-[#00ffcc]/50 bg-[#1c2252]/50"
                    title="Copy code"
                  >
                    <FaRegCopy className="w-4 h-4 text-[#00ffcc]" />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showConfirmDelete && (
        <div className="fixed inset-0 bg-black bg-opacity-75 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-gray-800 rounded-xl p-8 max-w-md w-full mx-4 border border-gray-700 text-center">
            <FaExclamationTriangle className="text-5xl text-yellow-500 mx-auto mb-4" />
            <h2 className="text-red-500 font-bold text-2xl mb-4">
              Confirm Delete
            </h2>
            <p className="mb-6 text-gray-300">
              Are you sure you want to delete this tournament?
              <br />
              <span className="text-red-400">
                This action cannot be undone.
              </span>
            </p>
            <div className="flex justify-center gap-4">
              <button
                onClick={() => setShowConfirmDelete(false)}
                className="px-6 py-3 rounded-lg bg-gray-600 text-white hover:bg-gray-700 transition-all duration-300"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteTournament}
                className="px-6 py-3 rounded-lg bg-red-500 text-white hover:bg-red-600 transition-all duration-300 disabled:opacity-50"
                disabled={isLoadingDelete}
              >
                {isLoadingDelete ? "Deleting..." : "Delete Tournament"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
