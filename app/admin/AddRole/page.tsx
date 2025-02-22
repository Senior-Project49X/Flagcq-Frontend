"use client";
import React, { FormEvent, useState } from "react";
import Navbar from "@/app/component/Navbar/navbar";
import { PostAddRole } from "@/app/lib/API/PostAddRole";
import { FaUserShield, FaUser, FaExclamationTriangle } from "react-icons/fa";

export default function Page() {
  const [showPopup, setShowPopup] = useState(false);
  const [selectedRole, setSelectedRole] = useState<"Admin" | "User" | null>(
    null
  );
  const [studentCode, setStudentCode] = useState<string>("");

  const handleRoleToggle = (role: "Admin" | "User") => {
    setSelectedRole((prevRole) => (prevRole === role ? null : role));
  };

  const handleConfirmClick = () => {
    setShowPopup(true);
  };

  const handlePopupClose = () => {
    setShowPopup(false);
  };

  const handleFinalConfirm = async (e: FormEvent) => {
    e.preventDefault();
    try {
      if (!studentCode || !selectedRole) {
        alert("Please fill in all required fields.");
        return;
      }
      await PostAddRole(studentCode, selectedRole);
      console.log(`Confirmed role: ${selectedRole}, for user: ${studentCode}`);
    } catch (error) {
      console.error("Error adding role:", error);
    }
    setShowPopup(false);
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="bg-gray-800 rounded-xl p-8 shadow-2xl border border-gray-700 max-w-2xl mx-auto mt-12">
          <h1 className="text-3xl font-bold mb-8 text-center text-green-400">
            Change User Role
          </h1>

          <div className="mb-6">
            <label
              htmlFor="student-code"
              className="block mb-2 text-lg text-gray-300"
            >
              Student Code / Email cmu.ac.th
            </label>
            <input
              id="student-code"
              type="text"
              value={studentCode}
              onChange={(e) => setStudentCode(e.target.value)}
              className="p-3 w-full bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 text-white placeholder-gray-400"
              placeholder="Enter student code or email"
            />
          </div>

          <div className="flex space-x-6 mb-8 justify-center">
            {(["Admin", "User"] as const).map((role) => (
              <button
                key={role}
                onClick={() => handleRoleToggle(role)}
                className={`flex items-center gap-2 px-6 py-3 rounded-lg transition-all duration-300 ${
                  selectedRole === role
                    ? "bg-green-500 text-white transform scale-105"
                    : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                }`}
              >
                {role === "Admin" ? (
                  <FaUserShield className="text-xl" />
                ) : (
                  <FaUser className="text-xl" />
                )}
                {role}
              </button>
            ))}
          </div>

          <button
            onClick={handleConfirmClick}
            disabled={!selectedRole || !studentCode}
            className={`w-full py-3 rounded-lg transition-all duration-300 ${
              selectedRole && studentCode
                ? "bg-green-500 hover:bg-green-600 text-white"
                : "bg-gray-600 text-gray-400 cursor-not-allowed"
            }`}
          >
            Confirm Changes
          </button>
        </div>
      </div>

      {/* Confirmation Modal */}
      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 backdrop-blur-sm">
          <div className="bg-gray-800 p-8 rounded-xl shadow-2xl border border-gray-700 max-w-md w-full mx-4">
            <div className="flex items-center justify-center mb-6 text-yellow-400">
              <FaExclamationTriangle className="text-4xl" />
            </div>

            <h2 className="text-2xl font-bold mb-4 text-center text-white">
              Confirm Role Change
            </h2>

            <div className="bg-gray-700 p-4 rounded-lg mb-6">
              <p className="text-gray-300 text-center">
                You are about to change the role to:{" "}
                <span className="font-bold text-green-400">
                  {selectedRole || "No Role Selected"}
                </span>
                <br />
                For user:{" "}
                <span className="font-bold text-green-400">
                  {studentCode || "None"}
                </span>
              </p>
            </div>

            <div className="flex justify-center space-x-4">
              <button
                onClick={handlePopupClose}
                className="px-6 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleFinalConfirm}
                className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
