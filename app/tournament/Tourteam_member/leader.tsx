"use client";
import Navbar from "../../component/Navbar/navbar";
import { useState, useEffect, use } from "react";
import { GetTourMem } from "../../lib/API/GetTourMem";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { KickPlayerTour } from "../../lib/API/KickPlayerTour";
import { DelTeamTour } from "../../lib/API/DelTeamTour";
import { useRouter } from "next/navigation";
import { FaRegCopy, FaExclamationTriangle, FaCheck } from "react-icons/fa";

type TourMemData = {
  tournamentName: string;
  teamId: number;
  teamName: string;
  invitedCode: string;
  memberCount: number;
  memberLimit: number;
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
  const [isCopied, setIsCopied] = useState(false); // State to track if code is copied

  const handleCopyCode = () => {
    navigator.clipboard.writeText(TourMemData?.invitedCode || "").then(() => {
      setIsCopied(true); // Set copied state to true
      setTimeout(() => setIsCopied(false), 2000); // Reset after 2 seconds
    });
  };

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
    <div className="min-h-screen text-white">
      <Navbar />
      <div className="text-center mt-8">
        <p className="text-2xl font-bold text-emerald-400">
          Tournament: {TourMemData?.tournamentName}
        </p>
        <p className="text-xl text-gray-300 mt-2">
          Team:{" "}
          <span className="font-semibold text-white">
            {TourMemData?.teamName}
          </span>
        </p>
        <p className="text-xl text-gray-300 mt-2 gap-2">
          Invite Code:{" "}
          <span className="font-semibold text-white">
            {TourMemData?.invitedCode}
          </span>
          <button
            onClick={handleCopyCode}
            className="ml-4 transition-all duration-300"
            title="Copy code"
          >
            {isCopied ? (
              <FaCheck className="w-4 h-4 text-green-500" /> // Show checkmark when copied
            ) : (
              <FaRegCopy className="w-4 h-4 text-[#00ffcc]" /> // Show copy icon by default
            )}
          </button>
        </p>
        <p className="text-2xl font-bold text-emerald-400 mt-4">
          {TourMemData?.memberCount}/{TourMemData?.memberLimit}
        </p>
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
        <div className="fixed inset-0 bg-black bg-opacity-75 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-gray-800 rounded-xl p-8 max-w-md w-full mx-4 border border-gray-700 text-center">
            <FaExclamationTriangle className="text-5xl text-yellow-500 mx-auto mb-4" />
            <h2 className="text-red-500 font-bold text-2xl mb-4">
              Confirm kick this player
            </h2>
            <p className="mb-6 text-gray-300">
              Are you sure you want to kick this player?
              <br />
              <span className="text-red-400">
                This action cannot be undone.
              </span>
            </p>
            <div className="flex justify-center gap-4">
              <button
                onClick={() => setShowPopupKick(false)}
                className="px-6 py-3 rounded-lg bg-gray-600 text-white hover:bg-gray-700 transition-all duration-300"
              >
                Cancel
              </button>
              <button
                onClick={() => handleKickPlayer()}
                className="px-6 py-3 rounded-lg bg-red-500 text-white hover:bg-red-600 transition-all duration-300 disabled:opacity-50"
              >
                Confirm
              </button>
            </div>
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
        <div className="fixed inset-0 bg-black bg-opacity-75 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-gray-800 rounded-xl p-8 max-w-md w-full mx-4 border border-gray-700 text-center">
            <FaExclamationTriangle className="text-5xl text-yellow-500 mx-auto mb-4" />
            <h2 className="text-red-500 font-bold text-2xl mb-4">
              Confirm Delete team
            </h2>
            <p className="mb-6 text-gray-300">
              Are you sure you want to delete the team?
              <br />
              <span className="text-red-400">
                This action cannot be undone.
              </span>
            </p>
            <div className="flex justify-center gap-4">
              <button
                onClick={() => setShowPopupDelTeam(false)}
                className="px-6 py-3 rounded-lg bg-gray-600 text-white hover:bg-gray-700 transition-all duration-300"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDeleteTeam()}
                className="px-6 py-3 rounded-lg bg-red-500 text-white hover:bg-red-600 transition-all duration-300 disabled:opacity-50"
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
