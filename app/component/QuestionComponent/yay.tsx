"use client";
import React from "react";

type YayProps = {
  handleCorrectAnswer: () => void;
  showPopup: boolean;
  setShowCongratPopup: (showPopup: boolean) => void;
};

export default function Yay({
  handleCorrectAnswer,
  showPopup,
  setShowCongratPopup,
}: Readonly<YayProps>) {
  if (!showPopup) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-20">
      <div className="bg-white p-6 rounded-lg shadow-lg text-center">
        <h2 className="text-2xl font-bold text-green-500 mb-4">
          Congratulations!
        </h2>
        <p>You answered correctly!</p>
        <button
          className="mt-4 bg-green-500 text-white px-6 py-2 rounded-lg"
          onClick={() => {
            setShowCongratPopup(false);
            handleCorrectAnswer();
            location.reload();
          }}
        >
          Close
        </button>
      </div>
    </div>
  );
}
