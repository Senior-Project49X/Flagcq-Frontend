"use client";
import Navbar from "../../component/navbar";
import { useState, useEffect } from "react";
import { GetTourMem } from "../../lib/API/GetTourMem";
import Image from "next/image";
import { useSearchParams } from "next/navigation";

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

export default function Member() {
  const [TourMemData, setTourMemdData] = useState<TourMemData | null>(null);
  const [showPopup, setShowPopup] = useState(false);
  const [isError, setIsError] = useState(false);
  const searchParams = useSearchParams();
  const teamId = searchParams.get("teamId");
  const tournamentId = searchParams.get("tournamentId");

  const handleLeaveTeam = async () => {
    try {
      // Call API to leave the team (replace this with your actual API logic)
      console.log("Leaving the team...");
      setShowPopup(false);
      alert("You have successfully left the team!");
    } catch (error) {
      console.error("Error leaving the team:", error);
      setIsError(true);
    }
  };

  const handleClosePopup = () => {
    setShowPopup(false);
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
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white rounded-lg p-12 max-w-2xl w-full text-center relative">
              <button
                onClick={handleClosePopup}
                className="absolute top-4 right-4 text-gray-600 hover:text-black font-bold text-2xl"
              >
                X
              </button>
              <h2 className="text-red-500 font-bold text-3xl mb-8">
                Are you sure you want to leave the team?
              </h2>
              <div className="flex justify-center gap-4">
                <button
                  onClick={handleLeaveTeam}
                  className="bg-red-500 text-white px-6 py-3 rounded-lg font-bold text-xl hover:bg-red-600"
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
