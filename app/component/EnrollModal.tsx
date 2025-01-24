import React, { FormEvent, useState, useEffect } from "react";
import { PostCreateTeam } from "../lib/API/GetCreateTeam";
import { isRoleAdmin } from "../lib/role";
import { DeleteTour } from "../lib/API/DelTourAPI";
import Link from "next/link";
import { useRouter } from "next/navigation";

type ModalDetail = {
  ClosePopup: () => void;
  Topic: string;
  Detail: string;
  tournament_id: number;
  TeamId: number;
  TeamCount: number;
  hasJoined: boolean;
};

export default function EnrollModal({
  ClosePopup,
  Topic,
  Detail,
  tournament_id,
  TeamId,
  TeamCount,
  hasJoined,
}: ModalDetail) {
  const [teamName, setTeamName] = useState("");
  const [inviteCode, setInviteCode] = useState("");
  const [isLoadingCreate, setIsLoadingCreate] = useState(false);
  const [isLoadingJoin, setIsLoadingJoin] = useState(false);
  const [isLoadingDelete, setIsLoadingDelete] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [role, setRole] = useState<boolean | null>(null);
  const router = useRouter();

  // Create a team
  const handleCreate = async (e: FormEvent) => {
    e.preventDefault();
    try {
      setIsLoadingCreate(true);
      setSuccessMessage(null);
      const teamData = await PostCreateTeam({ name: teamName, tournament_id }); // Creating a team
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

  // Delete the tournament
  const handleDeleteTournament = async () => {
    try {
      setIsLoadingDelete(true);
      setSuccessMessage(null);
      await DeleteTour(tournament_id); // Use centralized tournament_id
      setSuccessMessage("Tournament deleted successfully!");
    } catch (error) {
      console.error("Error deleting tournament:", error);
    } finally {
      setIsLoadingDelete(false);
    }
  };

  useEffect(() => {
    setRole(isRoleAdmin());
  }, []);

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
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b">
            <h3 className="text-lg font-semibold">{Topic}</h3>
            <button className="text-black text-2xl" onClick={ClosePopup}>
              x
            </button>
          </div>

          {/* Content */}
          <div className="px-6 py-6">
            <h4 className="text-center text-lg font-semibold mb-6">Detail</h4>
            <div className="text-center mb-6">{Detail}</div>

            {/* Admin View */}
            {role ? (
              <div className="grid grid-cols-2 gap-4">
                {/* Delete Tournament */}
                <div className="flex flex-col items-center border-r pr-4">
                  <h5 className="text-sm font-bold mb-2">
                    Delete this Tournament
                  </h5>
                  <button
                    onClick={handleDeleteTournament}
                    className="w-full bg-red-500 text-white py-2 rounded hover:bg-red-600 transition duration-300"
                    disabled={isLoadingDelete}
                  >
                    {isLoadingDelete ? "Deleting..." : "Delete"}
                  </button>
                </div>
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

              // <div className="border-2 border-gray-300 rounded-lg p-6">
              //   <h5 className="text-sm font-bold mb-2">Join team</h5>
              //   <form onSubmit={handleJoinTeam} className="w-full">
              //     <input
              //       type="text"
              //       placeholder="Invite Code"
              //       className="w-full px-3 py-2 border rounded mb-4"
              //       maxLength={50}
              //       value={inviteCode}
              //       onChange={(e) => setInviteCode(e.target.value)}
              //     />
              //     <button
              //       type="submit"
              //       className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition duration-300"
              //       disabled={isLoadingJoin}
              //     >
              //       {isLoadingJoin ? "Joining..." : "Join"}
              //     </button>
              //   </form>
              // </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
