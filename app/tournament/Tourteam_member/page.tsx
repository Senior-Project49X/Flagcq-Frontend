"use client";
import Navbar from "../../component/navbar";
import { useState, useEffect } from "react";
import { GetTourMem } from "../../lib/API/GetTourMem";
import Image from "next/image";

type TourMemData = {
  tournamentName: string;
  teamName: string;
  invitedCode: string;
  members: {
    userId: number;
    isLeader: boolean;
    student_id: number;
    first_name: string;
    last_name: string;
  }[];
};

export default function Tourteam_member() {
  const [TourMemData, setTourMemdData] = useState<TourMemData | null>(null);
  const [showPopup, setShowPopup] = useState(false);
  const [showPopupKick, setShowPopupKick] = useState(false);
  const [mem_number, setMem_number] = useState(2);
  const [isError, setIsError] = useState(false);

  const handleDeleteClick = () => {
    setShowPopup(true);
  };

  const handleKickClick = () => {
    setShowPopupKick(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
    // setTeamNameInput("");
    setIsError(false);
  };

  const handleCloseKickPopup = () => {
    setShowPopupKick(false);
    // setTeamNameInput("");
    setIsError(false);
  };

  // const handleConfirm = () => {
  //   if (teamNameInput === teamName) {
  //     handleClosePopup();
  //   } else {
  //     setIsError(true);
  //   }
  // };

  useEffect(() => {
    const fetchTourMemData = async () => {
      try {
        const response = await GetTourMem(3, 1);
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
          <p className="text-lg font-bold mt-4">{mem_number}/4</p>
        </div>

        <div className="grid grid-cols-2 gap-4 mt-8 px-8">
          <div className="bg-white rounded-lg flex items-center justify-center text-black font-bold py-24 relative">
            {TourMemData?.members[0]?.first_name}{" "}
            {TourMemData?.members[0]?.last_name}
            <span className="absolute top-2 right-2 text-yellow-500">👑</span>
          </div>

          <div className="bg-white rounded-lg flex items-center justify-center text-black font-bold py-24 relative">
            {TourMemData?.members[1]?.first_name &&
            TourMemData?.members[1]?.last_name ? (
              <>
                {TourMemData.members[1].first_name}{" "}
                {TourMemData.members[1].last_name}
              </>
            ) : (
              <span className="text-gray-400">👤</span>
            )}
            <button
              className="absolute top-2 right-2"
              onClick={handleKickClick}
            >
              <Image
                src="/kick.svg"
                alt="FlagConquest logo"
                width={35}
                height={35}
                className="object-contain"
              />
            </button>
          </div>

          <div className="bg-white rounded-lg flex items-center justify-center text-black font-bold py-24 relative">
            {TourMemData?.members[2]?.first_name &&
            TourMemData?.members[2]?.last_name ? (
              <>
                {TourMemData.members[2].first_name}{" "}
                {TourMemData.members[2].last_name}
              </>
            ) : (
              <span className="text-gray-400">👤</span>
            )}
            <button
              className="absolute top-2 right-2"
              onClick={handleKickClick}
            >
              <Image
                src="/kick.svg"
                alt="FlagConquest logo"
                width={35}
                height={35}
                className="object-contain"
              />
            </button>
          </div>

          <div className="bg-white rounded-lg flex items-center justify-center text-black font-bold py-24 relative">
            {TourMemData?.members[3]?.first_name &&
            TourMemData?.members[3]?.last_name ? (
              <>
                {TourMemData.members[3].first_name}{" "}
                {TourMemData.members[3].last_name}
              </>
            ) : (
              <span className="text-gray-400">👤</span>
            )}
            <button
              className="absolute top-2 right-2"
              onClick={handleKickClick}
            >
              <Image
                src="/kick.svg"
                alt="FlagConquest logo"
                width={35}
                height={35}
                className="object-contain"
              />
            </button>
          </div>
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
                Are you sure to leave this team?
              </h2>

              <button
                onClick={handleClosePopup}
                className="bg-red-500 text-white px-6 py-3 rounded-lg font-bold text-xl w-1/2 hover:bg-red-600"
              >
                Confirm
              </button>
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
