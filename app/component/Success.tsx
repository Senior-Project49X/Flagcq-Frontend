"use client";

import React from "react";
import { FaCheckCircle } from "react-icons/fa";

interface SuccessPopupProps {
  message: string;
  onClose?: () => void;
}

const SuccessPopup = ({ message, onClose }: SuccessPopupProps) => {
  const handleClose = () => {
    if (onClose) {
      onClose();
    }
    window.location.href = "/";
  };

  return (
    <>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="relative w-auto my-6 mx-auto max-w-md">
          <div className="relative bg-gray-800 rounded-xl shadow-2xl border-2 border-opacity-20 border-white">
            {/* Header */}
            <div className="p-6">
              <div className="flex flex-col items-center">
                <FaCheckCircle className="w-16 h-16 text-green-500 mb-4" />
                <h2 className="text-xl font-bold text-white mb-2">Success!</h2>
                <p className="text-gray-300">{message}</p>
              </div>
            </div>

            {/* Footer */}
            <div className="bg-gray-900 px-6 py-4 rounded-b-xl">
              <button
                className="w-full py-2 rounded-lg bg-green-500 hover:bg-green-600 text-white transition-all duration-300 font-semibold"
                onClick={handleClose}
              >
                Continue
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* Backdrop */}
      <div className="fixed inset-0 z-40 bg-black bg-opacity-75 backdrop-blur-sm"></div>
    </>
  );
};

export default SuccessPopup;
