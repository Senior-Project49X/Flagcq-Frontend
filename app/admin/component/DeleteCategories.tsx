import React, { FormEvent, useEffect, useRef } from "react";
import { DeleteCategoryAPI } from "../../lib/API/QuestionAPI";
import { FaExclamationTriangle } from "react-icons/fa";

type ModalProps = {
  id: string;
  onClose: (Category: string) => void;
};

export default function DeleteCategories({
  id,
  onClose,
}: Readonly<ModalProps>) {
  const DeleteCategoryRef = useRef<HTMLDivElement>(null);

  const onDeleteCategories = async (event: FormEvent) => {
    event.preventDefault();
    await DeleteCategoryAPI(parseInt(id));
    onClose(""); // Close modal after deletion
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        DeleteCategoryRef.current &&
        !DeleteCategoryRef.current.contains(event.target as Node)
      ) {
        onClose(id); // Close modal when clicking outside
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose, id]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 backdrop-blur-sm flex items-center justify-center z-50">
      <div
        className="bg-gray-800 rounded-xl p-8 max-w-md w-full mx-4 border border-gray-700 text-center"
        ref={DeleteCategoryRef}
      >
        <FaExclamationTriangle className="text-5xl text-yellow-500 mx-auto mb-4" />
        <h2 className="text-red-500 font-bold text-2xl mb-4">
          Delete Category
        </h2>
        <p className="mb-6 text-gray-300">
          Are you sure you want to delete this category?
          <br />
          <span className="text-red-400">
            This action will permanently delete the category and its associated
            questions.
          </span>
        </p>
        <div className="flex justify-center gap-4">
          <button
            onClick={() => onClose(id)} // Fixed onClick
            className="px-6 py-3 rounded-lg bg-gray-600 text-white hover:bg-gray-700 transition-all duration-300"
          >
            Cancel
          </button>
          <button
            onClick={onDeleteCategories} // Fixed onClick
            className="px-6 py-3 rounded-lg bg-red-500 text-white hover:bg-red-600 transition-all duration-300 disabled:opacity-50"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}
