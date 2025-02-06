"use client";

import React, { FormEvent, useState } from "react";
import Navbar from "@/app/component/Navbar/navbar";
import { PostAddRole } from "@/app/lib/API/PostAddRole";

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
    <div>
      <Navbar />
      <div className="bg-white rounded-lg p-6 text-black shadow-md w-1/2 items-center justify-center mt-20 ml-auto mr-auto">
        <h1 className="text-2xl font-bold mb-6 text-center">Change Role</h1>
        <div className="mb-4">
          <label htmlFor="student-code" className="block mb-2 text-lg">
            Student Code / Email cmu.ac.th
          </label>
          <input
            id="student-code"
            type="text"
            value={studentCode}
            onChange={(e) => setStudentCode(e.target.value)}
            className="p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="flex space-x-4 mb-6 justify-center">
          {(["Admin", "User"] as const).map((role) => (
            <button
              key={role}
              onClick={() => handleRoleToggle(role)}
              className={`px-4 py-2 font-bold rounded transition ${
                selectedRole === role
                  ? "bg-green-500 text-white"
                  : "bg-red-500 text-white"
              }`}
            >
              {role}
            </button>
          ))}
        </div>
        <button
          onClick={handleConfirmClick}
          className="bg-green-500 text-black py-2 px-4 w-full rounded-md hover:bg-green-600"
        >
          Confirm
        </button>
      </div>

      {/* Popup Modal */}
      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4 text-center">
              Are you sure?
            </h2>
            <p className="mb-6 text-center">
              You selected role:{" "}
              <span className="font-bold">
                {selectedRole || "No Role Selected"}
              </span>
              <br />
              For user:{" "}
              <span className="font-bold">{studentCode || "None"}</span>
            </p>
            <div className="flex justify-center space-x-4">
              <button
                onClick={handlePopupClose}
                className="bg-gray-300 py-2 px-4 rounded-md hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleFinalConfirm}
                className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
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
