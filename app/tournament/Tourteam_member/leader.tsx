"use client";
import Navbar from "../../component/navbar";
import { useState, useEffect } from "react";
import { GetTourMem } from "../../lib/API/GetTourMem";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { KickPlayerTour } from "../../lib/API/KickPlayerTour";

type TourMemData = {
  tournamentName: string;
  teamName: string;
  invitedCode: string;
  memberCount: number;
  members: {
    userId: number;
    isLeader: boolean;
    student_id: number;
    first_name: string;
    last_name: string;
  }[];
};

type KickPlayerTour = {
  team_id: number;
  member_id: number;
};

export default function leader() {
  const [TourMemData, setTourMemdData] = useState<TourMemData | null>(null);
  const [kickPlayerTour, setKickPlayerTour] = useState<KickPlayerTour | null>(
    null
  );
  const [showPopup, setShowPopup] = useState(false);
  const [showPopupKick, setShowPopupKick] = useState(false);
  const [isError, setIsError] = useState(false);
  const searchParams = useSearchParams();
  const teamId = searchParams.get("teamId");
  const tournamentId = searchParams.get("tournamentId");
  const [isLoadingDelete, setIsLoadingDelete] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleDeleteClick = () => {
    setShowPopup(true);
  };

  const handleKickClick = () => {
    setShowPopupKick(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
    setIsError(false);
  };

  const handleCloseKickPopup = () => {
    setShowPopupKick(false);
    setIsError(false);
  };

  useEffect(() => {
    const fetchTourMemData = async () => {
      try {
        const response = await GetTourMem(Number(tournamentId), Number(teamId));
        setTourMemdData(response);
      } catch (error) {
        console.error("Error fetching tournament data:", error);
      }
    };

    fetchTourMemData();
  }, []);

  const handleKickPlayer = async (team_id: number, member_id: number) => {
    try {
      setIsLoadingDelete(true);
      setSuccessMessage(null);
      await KickPlayerTour(team_id, member_id); // Now this should work correctly
      setSuccessMessage("Kicked player successfully!");
    } catch (error) {
      console.error("Error deleting tournament:", error);
    } finally {
      setIsLoadingDelete(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#090147] text-white">
      <Navbar />
      <div className="min-h-screen bg-[#090147] text-white">
        <div className="text-center mt-8">
          <p className="text-lg font-semibold">
            Tournament: {TourMemData?.tournamentName}
          </p>
          <p className="text-md">Team {TourMemData?.teamName}</p>
          <p className="text-md">รหัสเชิญ: {TourMemData?.invitedCode}</p>
          <p className="text-lg font-bold mt-4">{TourMemData?.memberCount}/4</p>
        </div>

        <div className="grid grid-cols-2 gap-4 mt-8 px-8">
          {TourMemData?.members.map((member, index) => (
            <div
              key={member.userId}
              className="bg-white rounded-lg flex items-center justify-center text-black font-bold py-24 relative"
            >
              {member.first_name && member.last_name ? (
                <>
                  {member.first_name} {member.last_name}
                  {member.isLeader && (
                    <span className="absolute top-2 right-2 text-yellow-500">
                      👑
                    </span>
                  )}
                </>
              ) : (
                <span className="text-gray-400">👤</span>
              )}
              {/* Show the kick button only if the current user is the leader */}
              {TourMemData.members[0].isLeader == true && (
                <>
                  {!member.isLeader && (
                    <button
                      className="absolute top-2 right-2"
                      onClick={handleKickClick}
                    >
                      <Image
                        src="/kick.svg"
                        alt="Kick Member"
                        width={35}
                        height={35}
                        className="object-contain"
                      />
                    </button>
                  )}
                </>
              )}
            </div>
          ))}
        </div>

        <div className="text-center mt-8">
          <button
            onClick={handleDeleteClick}
            className="text-red-500 font-bold hover:underline"
          >
            Delete Team
          </button>
        </div>

        {showPopup && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white rounded-lg p-12 max-w-2xl w-full text-center relative">
              <button
                onClick={handleClosePopup}
                className="absolute top-4 right-4 text-gray-600 hover:text-black font-bold text-2xl"
              >
                X
              </button>
              <h2 className="text-red-500 font-bold text-3xl mb-8">
                Are you sure you want to delete the team?
              </h2>
              <div className="flex justify-center gap-4">
                <button
                  onClick={handleClosePopup}
                  className="bg-red-500 text-white px-6 py-3 rounded-lg font-bold text-xl hover:bg-red-600"
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>
        )}
        {showPopupKick && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white rounded-lg p-12 max-w-2xl w-full text-center relative">
              <button
                onClick={handleCloseKickPopup}
                className="absolute top-4 right-4 text-gray-600 hover:text-black font-bold text-2xl"
              >
                X
              </button>
              <h2 className="text-red-500 font-bold text-3xl mb-8">
                Are you sure to kick this player?
              </h2>

              <button
                onClick={handleCloseKickPopup}
                className="bg-red-500 text-white px-6 py-3 rounded-lg font-bold text-xl w-1/2 hover:bg-red-600"
              >
                Confirm
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
