import React from "react";
import { FaExclamationTriangle } from "react-icons/fa";

interface PopupDeleteTournamentQUestionProps {
  setShowPopupDelTournamentQuestion: (show: boolean) => void;
  handleDeleteQuestion: () => void;
  Topic: string;
}
export default function PopupDeleteTournamentQUestion({
  setShowPopupDelTournamentQuestion,
  handleDeleteQuestion,
  Topic,
}: Readonly<PopupDeleteTournamentQUestionProps>) {
  return (
    <div>
      <div className="fixed inset-0 bg-black bg-opacity-75 backdrop-blur-sm flex items-center justify-center z-50">
        <div className="bg-gray-800 rounded-xl p-8 max-w-md w-full mx-4 border border-gray-700 text-center">
          <FaExclamationTriangle className="text-5xl text-yellow-500 mx-auto mb-4" />
          <h2 className="text-red-500 font-bold text-2xl mb-4">{Topic}</h2>

          <span className="text-red-400 mb-8">
            is already in Tournament Are you sure you want to delete the
            question in tournament?
          </span>

          <h2 className=" text-3xl mb-8"></h2>
          <div className="flex justify-center gap-4">
            <button
              onClick={() => setShowPopupDelTournamentQuestion(false)}
              className="px-6 py-3 rounded-lg bg-gray-600 text-white hover:bg-gray-700 transition-all duration-300"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                handleDeleteQuestion();
                location.reload();
              }}
              className="px-6 py-3 rounded-lg bg-red-500 text-white hover:bg-red-600 transition-all duration-300 disabled:opacity-50"
            >
              Confirm
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
