import React, { FormEvent, useState } from "react";
import { useRouter } from "next/router"; // Import useRouter
import { PostCreateTeam } from "../lib/API/GetCreateTeam";
import { PostJoinTeam } from "../lib/API/PostJoinTeam";

type ModalDetail = {
  ClosePopup: Function;
  Topic: string;
  Detail: string;
  tournament_id: number; // Add tournament_id prop
};

interface TeamData {
  name: string;
  tournament_id: number;
}

interface JoinTeamData {
  invite_code: string;
}

export default function EnrollModal({
  ClosePopup,
  Topic,
  Detail,
  tournament_id, // Destructure tournament_id
}: ModalDetail) {
  const [CreateTeamData, setCreateTeamData] = useState<TeamData>({
    name: "",
    tournament_id, // Initialize with the tournament_id from props
  });

  const [inviteCode, setInviteCode] = useState<JoinTeamData>({
    invite_code: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      setSuccessMessage(null);
      await PostCreateTeam(CreateTeamData); // API call to create the team
      setSuccessMessage("Team created successfully!");
    } catch (error) {
      console.error("Error creating team:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleJoinTeam = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      setSuccessMessage(null);
      // Replace with actual API call for joining a team using invite_code
      await PostJoinTeam(inviteCode);
      setSuccessMessage("Successfully joined the team!");
    } catch (error) {
      console.error("Error joining team:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCreateTeamData({
      ...CreateTeamData,
      name: e.target.value, // Update team name in state
    });
  };

  const handleInviteCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInviteCode({
      ...inviteCode,
      invite_code: e.target.value,
    });
  };

  return (
    <>
      <div
        className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
        onMouseDown={() => ClosePopup(true)}
      >
        <div
          className="relative w-full max-w-lg mx-auto bg-white rounded-lg shadow-lg"
          onMouseDown={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b">
            <h3 className="text-lg font-semibold">{Topic}</h3>
            <button
              className="text-black text-2xl"
              onClick={() => ClosePopup(true)}
            >
              x
            </button>
          </div>

          <div className="px-6 py-6">
            <h4 className="text-center text-lg font-semibold mb-6">Detail</h4>
            <div className="text-center mb-6">{Detail}</div>
            <div className="grid grid-cols-2 gap-4">
              {/* Create New Team Section */}
              <div className="flex flex-col items-center border-r pr-4">
                <h5 className="text-sm font-bold mb-2">Create new team</h5>
                <form onSubmit={handleSubmit} className="w-full">
                  <input
                    type="text"
                    name="TeamName"
                    placeholder="Team Name"
                    className="w-full px-3 py-2 border rounded mb-4"
                    maxLength={50}
                    value={CreateTeamData.name}
                    onChange={handleInputChange}
                  />
                  <button
                    type="submit"
                    className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600 transition duration-300"
                    disabled={isLoading}
                  >
                    {isLoading ? "Creating..." : "Create"}
                  </button>
                </form>
              </div>

              {/* Already Have a Team Section */}
              <div className="flex flex-col items-center">
                <h5 className="text-sm font-bold mb-2">Already have a team</h5>
                <form onSubmit={handleJoinTeam} className="w-full">
                  <input
                    type="text"
                    name="InviteCode"
                    placeholder="Invite Code"
                    className="w-full px-3 py-2 border rounded mb-4"
                    maxLength={50}
                    value={inviteCode.invite_code}
                    onChange={handleInviteCodeChange}
                  />
                  <button
                    type="submit"
                    className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition duration-300"
                    disabled={isLoading}
                  >
                    {isLoading ? "Joining..." : "Join"}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="opacity-40 fixed inset-0 z-40 bg-black"></div>
    </>
  );
}
