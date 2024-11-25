"use client";
import Navbar from "../../component/navbar";
import { useState } from "react";

export default function Tourteam() {
  const [showPopup, setShowPopup] = useState(false);
  const [teamNameInput, setTeamNameInput] = useState("");
  const [tournamentName, setTournamentName] = useState("linux");
  const [teamName, setTeamName] = useState("auto5678");
  const [isLeader, setIsLeader] = useState(true);
  const [isMember, setIsMember] = useState(false);
  const [iscode, setIscode] = useState("xxxxxx");
  const [mem_number, setMem_number] = useState(2);
  const [isError, setIsError] = useState(false);

  const handleDeleteClick = () => {
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
    setTeamNameInput("");
    setIsError(false);
  };

  const handleConfirm = () => {
    if (teamNameInput === teamName) {
      handleClosePopup();
    } else {
      setIsError(true);
    }
  };

  return (
    <div className="min-h-screen bg-[#090147] text-white">
      <Navbar />
      <div className="min-h-screen bg-[#090147] text-white">
        <div className="text-center mt-8">
          <p className="text-lg font-semibold">Tournament: {tournamentName}</p>
          <p className="text-md">Team {teamName}</p>
          <p className="text-md">รหัสเชิญ: {iscode}</p>
          <p className="text-lg font-bold mt-4">{mem_number}/4</p>
        </div>

        <div className="grid grid-cols-2 gap-4 mt-8 px-8">
          <div className="bg-white rounded-lg flex items-center justify-center text-black font-bold py-24 relative">
            User1
            <span className="absolute top-2 right-2 text-yellow-500">👑</span>
          </div>

          <div className="bg-white rounded-lg flex items-center justify-center text-black font-bold py-24 relative">
            User2
            <span className="absolute top-2 right-2 text-gray-500">⚙️</span>
          </div>

          <div className="bg-white rounded-lg flex items-center justify-center text-black font-bold py-24">
            <span className="text-gray-400">👤</span>
          </div>

          <div className="bg-white rounded-lg flex items-center justify-center text-black font-bold py-24">
            <span className="text-gray-400">👤</span>
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
            <div className="bg-white rounded-lg p-12 max-w-4xl w-full text-center relative">
              <button
                onClick={handleClosePopup}
                className="absolute top-4 right-4 text-gray-600 hover:text-black font-bold text-2xl"
              >
                X
              </button>
              <h2 className="text-red-500 font-bold text-3xl mb-8">
                Are you sure to delete this team?
              </h2>
              <p className="text-red-500 font-medium text-lg mb-6">
                Write your team name to confirm
              </p>
              <input
                type="text"
                placeholder="Team name"
                value={teamNameInput}
                onChange={(e) => {
                  setTeamNameInput(e.target.value);
                  if (isError) setIsError(false);
                }}
                className={`w-3/4 border rounded-lg p-4 mb-2 text-lg ${
                  isError ? "border-red-500" : "border-gray-300"
                } text-black`}
              />
              {isError && (
                <p className="text-red-500 text-sm mb-6">Invalid team name</p>
              )}
              <button
                onClick={handleConfirm}
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
