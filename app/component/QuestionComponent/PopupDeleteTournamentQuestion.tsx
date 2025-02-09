import React from "react";

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
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-20">
        <div className="bg-white rounded-lg p-12 max-w-2xl w-full text-center relative">
          <button
            onClick={() => setShowPopupDelTournamentQuestion(false)}
            className="absolute top-4 right-4 text-gray-600 hover:text-black font-bold text-2xl"
          >
            X
          </button>
          <h2 className="text-red-500 font-bold text-3xl mb-8">
            <p className="text-green-400 mb-4 ">{Topic}</p> is already in
            Tournament Are you sure you want to delete the question in
            tournament?
          </h2>
          <div className="flex justify-center gap-4">
            <button
              onClick={handleDeleteQuestion}
              className="bg-red-500 text-white px-6 py-3 rounded-lg font-bold text-xl hover:bg-red-600"
            >
              Confirm
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
