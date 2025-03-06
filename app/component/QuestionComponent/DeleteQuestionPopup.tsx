import React, { useEffect } from "react";
import { FaExclamationTriangle } from "react-icons/fa";
interface DeleteQuestionProps {
  handleConfirmDelete: () => void;
  DeleteRef?: React.RefObject<HTMLDivElement>;
  handleClosePopup: () => void;
}
export default function DeleteQPuestionPopup({
  handleConfirmDelete,
  DeleteRef,
  handleClosePopup,
}: Readonly<DeleteQuestionProps>) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 backdrop-blur-sm flex items-center justify-center z-50">
      <div
        className="bg-gray-800 rounded-xl p-8 max-w-md w-full mx-4 border border-gray-700 text-center"
        ref={DeleteRef}
      >
        <FaExclamationTriangle className="text-5xl text-yellow-500 mx-auto mb-4" />
        <h2 className="text-red-500 font-bold text-2xl mb-4">Confirm Delete</h2>
        <p className="mb-6 text-gray-300">
          Are you sure you want to delete this question?
          <br />
          <span className="text-red-400">This action cannot be undone.</span>
        </p>
        <div className="flex justify-center gap-4">
          <button
            onClick={handleClosePopup}
            className="px-6 py-3 rounded-lg bg-gray-600 text-white hover:bg-gray-700 transition-all duration-300"
          >
            Cancel
          </button>
          <button
            onClick={handleConfirmDelete}
            className="px-6 py-3 rounded-lg bg-red-500 text-white hover:bg-red-600 transition-all duration-300 disabled:opacity-50"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}
