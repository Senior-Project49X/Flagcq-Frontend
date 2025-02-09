import React from "react";
interface DeleteQuestionProps {
  handleClosePopup: () => void;
  handleConfirmDelete: () => void;
  name: string;
  setName: (name: string) => void;
  isError: boolean;
}
export default function DeleteQPuestionPopup({
  handleClosePopup,
  handleConfirmDelete,
  name,
  setName,
  isError,
}: Readonly<DeleteQuestionProps>) {
  return (
    <div>
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-20">
        <div className="bg-white rounded-lg p-12 max-w-4xl w-full text-center relative">
          <button
            onClick={handleClosePopup}
            className="absolute top-4 right-4 text-gray-600 hover:text-black font-bold text-2xl"
          >
            X
          </button>
          <h2 className="text-red-500 font-bold text-2xl mb-4">
            Are you sure you want to delete this question?
          </h2>
          <p className="mb-4">Please type the question&#39s name to confirm.</p>
          <input
            type="text"
            placeholder="Team name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={`w-full p-2 border rounded-lg mb-4 ${
              isError ? "border-red-500" : "border-gray-300"
            }`}
          />
          {isError && <p className="text-red-500 text-sm mb-6">Wrong name</p>}
          <button
            onClick={handleConfirmDelete}
            className="bg-red-500 text-white px-6 py-3 rounded-lg font-bold text-xl w-1/2 hover:bg-red-600"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}
