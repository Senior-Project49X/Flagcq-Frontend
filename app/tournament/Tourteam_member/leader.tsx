"use client";
import Navbar from "../../component/Navbar/navbar";
import { useState, useEffect, use } from "react";
import { GetTourMem } from "../../lib/API/GetTourMem";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { KickPlayerTour } from "../../lib/API/KickPlayerTour";
import { DelTeamTour } from "../../lib/API/DelTeamTour";
import { useRouter } from "next/navigation";

type TourMemData = {
  tournamentName: string;
  teamId: number;
  teamName: string;
  invitedCode: string;
  memberCount: number;
  members: {
    userId: string;
    isLeader: boolean;
    student_id: number;
    first_name: string;
    last_name: string;
  }[];
};

export default function Leader() {
  const [TourMemData, setTourMemdData] = useState<TourMemData | null>(null);
  const [memberCount, setMemberCount] = useState<number>(0); // Track member count dynamically
  const [selectedMemberId, setSelectedMemberId] = useState<string | null>(null);
  const [showPopupKick, setShowPopupKick] = useState(false);
  const [isLoadingKick, setIsLoadingKick] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [showPopupDelTeam, setShowPopupDelTeam] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const teamId = searchParams.get("teamId");
  const tournamentId = searchParams.get("tournamentId");

  // Fetch data on component load
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
  }, [tournamentId, teamId]);

  // Update memberCount whenever members change
  useEffect(() => {
    if (TourMemData?.members) {
      setMemberCount(TourMemData.members.length);
    }
  }, [TourMemData?.members]);

  const handleKickPlayer = async () => {
    if (!teamId || !selectedMemberId) return;

    try {
      setIsLoadingKick(true);
      setSuccessMessage(null);

      // Call the API to kick the player
      await KickPlayerTour({
        team_id: Number(teamId),
        member_id: String(selectedMemberId),
      });

      // Update state after successfully kicking the player
      setSuccessMessage("Player kicked successfully!");
      setTourMemdData((prev) => {
        if (!prev) return prev;
        return {
          ...prev,
          members: prev.members.filter(
            (member) => member.userId !== selectedMemberId
          ),
        };
      });
    } catch (error) {
      console.error("Error kicking player:", error);
    } finally {
      setIsLoadingKick(false);
      setShowPopupKick(false);
    }
  };

  const handleDeleteTeam = async () => {
    try {
      setSuccessMessage(null);
      if (tournamentId !== null) {
        await DelTeamTour(Number(tournamentId));
      }
      setSuccessMessage("Tournament deleted successfully!");
      router.push("/myteam");
    } catch (error) {
      console.error("Error deleting tournament:", error);
    } finally {
      setShowPopupDelTeam(false);
    }
  };

  const handleOpenKickPopup = (userId: string) => {
    setSelectedMemberId(userId);
    setShowPopupKick(true);
  };

  return (
    <div className="min-h-screen bg-[#090147] text-white">
      <Navbar />
      <div className="text-center mt-8">
        <p className="text-lg font-semibold">
          Tournament: {TourMemData?.tournamentName}
        </p>
        <p className="text-md">Team: {TourMemData?.teamName}</p>
        <p className="text-md">Invite Code: {TourMemData?.invitedCode}</p>
        <p className="text-lg font-bold mt-4">{memberCount}/4</p>
      </div>

      <div className="grid grid-cols-2 gap-4 mt-8 px-8">
        {TourMemData?.members.map((member) => (
          <div
            key={member.userId}
            className="bg-white rounded-lg flex items-center justify-center text-black font-bold py-24 relative"
          >
            <span>
              {member.first_name} {member.last_name}
            </span>
            {member.isLeader && (
              <span className="absolute top-2 right-2 text-yellow-500">
                👑 Leader
              </span>
            )}
            {!member.isLeader && (
              <button
                onClick={() => handleOpenKickPopup(member.userId)}
                className="absolute top-2 right-2 "
              >
                <Image
                  src="/kick.svg"
                  alt="FlagConquest logo"
                  width={35}
                  height={35}
                  className="object-contain"
                />
              </button>
            )}
          </div>
        ))}
      </div>

      {showPopupKick && selectedMemberId && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-12 max-w-2xl w-full text-center relative">
            <button
              onClick={() => setShowPopupKick(false)}
              className="absolute top-4 right-4 text-gray-600 hover:text-black font-bold text-2xl"
            >
              X
            </button>
            <h2 className="text-red-500 font-bold text-3xl mb-8">
              Are you sure you want to kick this player?
            </h2>

            <button
              onClick={() => handleKickPlayer()}
              disabled={isLoadingKick}
              className={`${
                isLoadingKick ? "bg-gray-400" : "bg-red-500 hover:bg-red-600"
              } text-white px-6 py-3 rounded-lg font-bold text-xl w-1/2`}
            >
              {isLoadingKick ? "Processing..." : "Confirm"}
            </button>
          </div>
        </div>
      )}

      <div className="text-center mt-8">
        <button
          onClick={() => setShowPopupDelTeam(true)}
          className="text-red-500 font-bold hover:underline"
        >
          Delete Team
        </button>
      </div>

      {showPopupDelTeam && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-12 max-w-2xl w-full text-center relative">
            <button
              onClick={() => setShowPopupDelTeam(false)}
              className="absolute top-4 right-4 text-gray-600 hover:text-black font-bold text-2xl"
            >
              X
            </button>
            <h2 className="text-red-500 font-bold text-3xl mb-8">
              Are you sure you want to delete the team?
            </h2>
            <div className="flex justify-center gap-4">
              <button
                onClick={() => handleDeleteTeam()}
                className="bg-red-500 text-white px-6 py-3 rounded-lg font-bold text-xl hover:bg-red-600"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}

      {successMessage && (
        <div className="fixed bottom-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg">
          {successMessage}
        </div>
      )}
    </div>
  );
}
