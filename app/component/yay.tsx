"use client";
import React from "react";

type YayProps = {
  showPopup: boolean;
  setShowPopup: (value: boolean) => void;
};

export default function Yay({ showPopup, setShowPopup }: YayProps) {
  if (!showPopup) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-10 max-w-lg w-full text-center relative shadow-lg">
        <button
          onClick={() => setShowPopup(false)}
          className="absolute top-4 right-4 text-gray-600 hover:text-black font-bold text-2xl"
        >
          ×
        </button>
        <h2 className="text-emerald-500 font-bold text-3xl mb-4">
          🎉 Congratulations! 🎉
        </h2>
        <p className="text-gray-700 text-lg mb-6">
          You've successfully completed the task! Well done!
        </p>
        <button
          onClick={() => setShowPopup(false)}
          className="bg-emerald-500 text-white px-6 py-3 rounded-lg font-bold text-xl hover:bg-emerald-600"
        >
          Close
        </button>
      </div>
    </div>
  );
}
