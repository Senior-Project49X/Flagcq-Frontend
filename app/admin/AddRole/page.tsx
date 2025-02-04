"use client";

import React, { useState } from "react";
import Navbar from "@/app/component/Navbar/navbar";

export default function Page() {
  const [showPopup, setShowPopup] = useState(false);
  const [selectedRole, setSelectedRole] = useState<"Admin" | "Student" | null>(
    null
  );

  const handleRoleToggle = (role: "Admin" | "Student") => {
    setSelectedRole((prevRole) => (prevRole === role ? null : role));
  };

  const handleConfirmClick = () => {
    setShowPopup(true);
  };

  const handlePopupClose = () => {
    setShowPopup(false);
  };

  const handleFinalConfirm = () => {
    setShowPopup(false);
    console.log(`Confirmed role: ${selectedRole || "None"}`);
  };

  return (
    <div>
      <Navbar />
      <div className="bg-white rounded-lg p-6 text-black shadow-md w-1/2 items-center justify-center mt-20 ml-auto mr-auto">
        <h1 className="text-2xl font-bold mb-6 text-center">Change Role</h1>
        <div className="mb-4">
          <label htmlFor="student-code" className="block mb-2 text-lg">
            Student Code
          </label>
          <input
            id="student-code"
            type="text"
            className="p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="flex space-x-4 mb-6 justify-center">
          <button
            onClick={() => handleRoleToggle("Admin")}
            className={`py-2 px-4 rounded-md ${
              selectedRole === "Admin"
                ? "bg-green-500 text-white"
                : "bg-green-300 hover:bg-green-400"
            }`}
          >
            Admin
          </button>
          <button
            onClick={() => handleRoleToggle("Student")}
            className={`py-2 px-4 rounded-md ${
              selectedRole === "Student"
                ? "bg-red-500 text-white"
                : "bg-red-300 hover:bg-red-400"
            }`}
          >
            Student
          </button>
        </div>
        <button
          onClick={handleConfirmClick}
          className="bg-red-500 text-white py-2 px-4 w-full rounded-md hover:bg-red-600"
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
              You selected:{" "}
              <span className="font-bold">
                {selectedRole || "No Role Selected"}
              </span>
              . Do you want to confirm this action?
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
