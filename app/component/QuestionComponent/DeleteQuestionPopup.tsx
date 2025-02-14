import React, { useEffect } from "react";
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
    <div>
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-30">
        <div
          ref={DeleteRef}
          className="bg-white rounded-lg p-12 max-w-4xl w-full text-center relative"
        >
          <button
            onClick={handleClosePopup}
            className="absolute top-4 right-4 text-gray-600 hover:text-black font-bold text-2xl"
          >
            X
          </button>
          <h2 className="text-red-500 font-bold text-2xl mb-4">
            Are you sure you want to delete this question?
          </h2>
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
