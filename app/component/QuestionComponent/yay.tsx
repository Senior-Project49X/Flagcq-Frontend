"use client";
import React, { useEffect } from "react";

type YayProps = {
  handleCorrectAnswer: () => void;
  showPopup: boolean;
  setShowCongratPopup: (showPopup: boolean) => void;
  yayRef: React.RefObject<HTMLDivElement>;
};

export default function Yay({
  handleCorrectAnswer,
  showPopup,
  setShowCongratPopup,
  yayRef,
}: Readonly<YayProps>) {
  if (!showPopup) return null;

  useEffect(() => {
    const handleYayOutsideClick = (event: MouseEvent) => {
      if (yayRef.current && !yayRef.current.contains(event.target as Node)) {
        // Do nothing (keep the Yay popup open)
      }
    };

    if (showPopup) {
      document.addEventListener("mousedown", handleYayOutsideClick);
      return () => {
        document.removeEventListener("mousedown", handleYayOutsideClick);
      };
    }
  }, [showPopup]);

  // Use yayRef for the Yay popup div
  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-30"
      ref={yayRef}
    >
      <div className="bg-white p-6 rounded-lg shadow-lg text-center">
        <h2 className="text-2xl font-bold text-green-500 mb-4">
          Congratulations!
        </h2>
        <p>You answered correctly!</p>
        <button
          className="mt-4 bg-green-500 text-white px-6 py-2 rounded-lg"
          onClick={() => location.reload()}
        >
          Close
        </button>
      </div>
    </div>
  );
}
