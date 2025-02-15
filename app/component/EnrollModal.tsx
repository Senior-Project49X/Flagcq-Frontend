"use client";

import React, { FormEvent, useState, useEffect } from "react";
import { PostCreateTeam } from "../lib/API/GetCreateTeam";
import { EditTourAPI } from "../lib/API/EditTour";
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
      router.push("/tournament");
    } catch (error) {
      console.error("Error deleting tournament:", error);
    } finally {
      setIsLoadingDelete(false);
      setShowConfirmDelete(false);
    }
  };

  return (
    <>
      <div className="opacity-40 fixed inset-0 z-40 bg-black"></div>
      <div
        className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
        onMouseDown={ClosePopup}
      >
        <div
          className="relative w-full max-w-lg mx-auto bg-white rounded-lg shadow-lg"
          onMouseDown={(e) => e.stopPropagation()}
        >
          <div className="flex items-center justify-between px-6 py-4 border-b">
            <h3 className="text-lg font-semibold">{Topic}</h3>
            <button className="text-black text-2xl" onClick={ClosePopup}>
              &times;
            </button>
          </div>

          <div className="px-6 py-6">
            <h4 className="text-center text-lg font-semibold mb-6">Detail</h4>
            <div className="text-center mb-6">
              {" "}
              <div
                className="text-white text-lg leading-relaxed break-words rich-text"
                dangerouslySetInnerHTML={{
                  __html: Detail ?? "",
                }}
              />
            </div>

            {isAdmin ? (
              <div className="flex flex-col gap-4">
                {/* Grid for Delete & Edit */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col items-center border-r pr-4">
                    <button
                      onClick={() => setShowConfirmDelete(true)}
                      className="w-full bg-red-500 text-white py-2 rounded hover:bg-red-600 transition duration-300"
                    >
                      Delete
                    </button>
                  </div>
                  <div className="flex flex-col items-center">
                    <button
                      onClick={handleEditTour}
                      className="w-full bg-yellow-400 text-black py-2 rounded hover:bg-yellow-600 transition duration-300"
                    >
                      Edit
                    </button>
                  </div>
                </div>

                {/* Full-width "View Tournament" Button */}
                <button
                  onClick={handleAdminRoute}
                  className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600 transition duration-300"
                >
                  View Tournament
                </button>
              </div>
            ) : (
              <div className="flex flex-col items-center">
                <h5 className="text-sm font-bold mb-2">Create new team</h5>
                <form onSubmit={handleCreate} className="w-full">
                  <input
                    type="text"
                    placeholder="Team Name"
                    className="w-full px-3 py-2 border rounded mb-4"
                    maxLength={50}
                    value={teamName}
                    onChange={(e) => setTeamName(e.target.value)}
                  />
                  <button
                    type="submit"
                    className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600 transition duration-300"
                    disabled={isLoadingCreate}
                  >
                    {isLoadingCreate ? "Creating..." : "Create"}
                  </button>
                </form>
              </div>
            )}

            {joinCode && (
              <div className="flex flex-col items-center font-semibold">
                <br />
                Code: {joinCode}
              </div>
            )}
          </div>
        </div>
      </div>

      {showConfirmDelete && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full text-center relative">
            <h2 className="text-red-500 font-bold text-2xl mb-4">
              Confirm Delete
            </h2>
            <p className="mb-6">
              Are you sure you want to delete this tournament?
            </p>
            <div className="flex justify-center gap-4">
              <button
                onClick={() => setShowConfirmDelete(false)}
                className="px-6 py-2 rounded bg-gray-400 text-white hover:bg-gray-500"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteTournament}
                className="px-6 py-2 rounded bg-red-500 text-white hover:bg-red-600"
                disabled={isLoadingDelete}
              >
                {isLoadingDelete ? "Deleting..." : "Confirm"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
