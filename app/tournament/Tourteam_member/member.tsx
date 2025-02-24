"use client";
import Navbar from "../../component/Navbar/navbar";
import { useState, useEffect } from "react";
import { GetTourMem } from "../../lib/API/GetTourMem";
import { LeaveTeam } from "@/app/lib/API/LeaveTeam";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { FaExclamationTriangle, FaRegCopy, FaCheck } from "react-icons/fa";

type TourMemData = {
  tournamentName: string;
  teamName: string;
  invitedCode: string;
  memberCount: number;
  memberLimit: number;
  members: {
    userId: number;
    isLeader: boolean;
    student_id: number;
    first_name: string;
    last_name: string;
  }[];
};

export default function Member() {
  const [TourMemData, setTourMemdData] = useState<TourMemData | null>(null);
  const [showPopup, setShowPopup] = useState(false);
  const [isError, setIsError] = useState(false);
  const searchParams = useSearchParams();
  const teamId = searchParams.get("teamId");
  const tournamentId = searchParams.get("tournamentId");
  const router = useRouter();

  const [isCopied, setIsCopied] = useState(false); // State to track if code is copied

  const handleCopyCode = () => {
    navigator.clipboard.writeText(TourMemData?.invitedCode || "").then(() => {
      setIsCopied(true); // Set copied state to true
      setTimeout(() => setIsCopied(false), 2000); // Reset after 2 seconds
    });
  };

  const handleLeaveTeam = async () => {
    if (!teamId) {
      setIsError(true);
      return;
    }
    try {
      await LeaveTeam({ team_id: Number(teamId) });
      router.push("/myteam");
    } catch (error) {
      console.error("Error leaving team:", error);
      setIsError(true);
    }
  };

  const handleClosePopup = () => {
    setShowPopup(false);
    setIsError(false);
  };

  useEffect(() => {
    if (!tournamentId || !teamId) {
      console.error("Missing tournamentId or teamId in URL");
      return;
    }

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

  return (
    <div className="min-h-screen text-white">
      <Navbar />
      <div className="min-h-screen text-white">
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
            </div>
          ))}
        </div>

        <div className="text-center mt-8">
          <button
            onClick={() => setShowPopup(true)}
            className="text-red-500 font-bold hover:underline"
          >
            Leave Team
          </button>
        </div>

        {showPopup && (
          <div className="fixed inset-0 bg-black bg-opacity-75 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-gray-800 rounded-xl p-8 max-w-md w-full mx-4 border border-gray-700 text-center">
              <FaExclamationTriangle className="text-5xl text-yellow-500 mx-auto mb-4" />
              <h2 className="text-red-500 font-bold text-2xl mb-4">
                Confirm Leave team
              </h2>
              <p className="mb-6 text-gray-300">
                Are you sure you want to leave the team?
                <br />
                <span className="text-red-400">
                  This action cannot be undone.
                </span>
              </p>
              <div className="flex justify-center gap-4">
                <button
                  onClick={handleClosePopup}
                  className="px-6 py-3 rounded-lg bg-gray-600 text-white hover:bg-gray-700 transition-all duration-300"
                >
                  Cancel
                </button>
                <button
                  onClick={handleLeaveTeam}
                  className="px-6 py-3 rounded-lg bg-red-500 text-white hover:bg-red-600 transition-all duration-300 disabled:opacity-50"
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>
        )}

        {isError && (
          <div className="text-center text-red-500 mt-4">
            Error: Unable to leave the team. Please try again later.
          </div>
        )}
      </div>
    </div>
  );
}
