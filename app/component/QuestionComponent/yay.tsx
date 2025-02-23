"use client";
import React, { useEffect } from "react";
import { FaTrophy, FaCheckCircle, FaStar } from "react-icons/fa";

type YayProps = {
  handleCorrectAnswer: () => void;
  showPopup: boolean;
  setShowCongratPopup: (showPopup: boolean) => void;
  yayRef: React.RefObject<HTMLDivElement>;
  point: number | undefined;
};

export default function Yay({
  point,
  handleCorrectAnswer,
  showPopup,
  setShowCongratPopup,
  yayRef,
}: Readonly<YayProps>) {
  if (!showPopup) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 backdrop-blur-sm flex items-center justify-center z-30">
      <div
        ref={yayRef}
        className="bg-gray-800 p-8 rounded-2xl shadow-2xl text-center max-w-md w-full mx-4 border-2 border-green-400 animate-popup relative overflow-hidden"
      >
        {/* Decorative Stars */}
        <FaStar className="absolute top-4 left-4 text-yellow-400 w-6 h-6 animate-pulse" />
        <FaStar className="absolute top-4 right-4 text-yellow-400 w-6 h-6 animate-pulse" />
        <FaStar className="absolute bottom-4 left-4 text-yellow-400 w-6 h-6 animate-pulse" />
        <FaStar className="absolute bottom-4 right-4 text-yellow-400 w-6 h-6 animate-pulse" />

        {/* Trophy Icon */}
        <div className="flex justify-center mb-6">
          <div className="relative">
            <FaTrophy className="text-yellow-400 w-20 h-20 animate-bounce" />
            <div className="absolute -top-2 -right-2">
              <FaCheckCircle className="text-green-500 w-8 h-8" />
            </div>
          </div>
        </div>

        {/* Congratulations Text */}
        <h2 className="text-3xl font-bold text-green-400 mb-4">
          Congratulations!
        </h2>
        <p className="text-xl text-gray-300 mb-6">
          You solved the challenge correctly!
        </p>

        {/* Score Display */}
        <div className="bg-gray-700 rounded-lg p-4 mb-6">
          <p className="text-green-300 text-lg flex items-center justify-center gap-2">
            <FaStar className="text-yellow-400" />+{point} Points Earned
            <FaStar className="text-yellow-400" />
          </p>
        </div>

        {/* Buttons */}
        <div className="flex gap-4 justify-center">
          <button
            className="px-6 py-3 bg-green-500 hover:bg-green-600 text-white rounded-lg font-semibold transition-all duration-300 hover:-translate-y-1"
            onClick={() => location.reload()}
          >
            Next Challenge
          </button>
        </div>
      </div>

      <style jsx>{`
        @keyframes popup {
          0% {
            transform: scale(0.5);
            opacity: 0;
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }
        .animate-popup {
          animation: popup 0.3s ease-out forwards;
        }
      `}</style>
    </div>
  );
}
