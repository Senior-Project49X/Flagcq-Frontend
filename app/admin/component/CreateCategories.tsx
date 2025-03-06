import React, { FormEvent, useEffect, useRef } from "react";
import { CreateCategoriesAPI } from "../../lib/API/QuestionAPI";

type ModalProps = {
  onClose: (category: string) => void;
};

export default function CreateCategories({ onClose }: Readonly<ModalProps>) {
  const categoryRef = useRef<HTMLDivElement>(null);

  const onCreateCategories = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    const category = formData.get("Category");
    if (category && typeof category === "string") {
      const categoryId = await CreateCategoriesAPI(category);
      onClose(categoryId);
    } else {
      onClose("");
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        categoryRef.current &&
        !categoryRef.current.contains(event.target as Node)
      ) {
        onClose("");
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 backdrop-blur-sm flex items-center justify-center z-50">
      <div
        className="bg-gray-800 rounded-xl p-8 max-w-md w-full mx-4 border border-gray-700 text-center"
        ref={categoryRef}
      >
        <h2 className="text-green-400 font-bold text-2xl mb-4">
          Create New Category
        </h2>
        <form
          onSubmit={onCreateCategories}
          className="flex flex-col items-center gap-4"
        >
          <input
            type="text"
            name="Category"
            className="w-full p-3 rounded-lg border border-gray-600 bg-gray-900 text-white focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="Enter category name"
          />
          <div className="flex justify-center gap-4">
            <button
              onClick={() => onClose("")}
              type="button"
              className="px-6 py-3 rounded-lg bg-gray-600 text-white hover:bg-gray-700 transition-all duration-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-3 rounded-lg bg-green-500 text-white hover:bg-green-600 transition-all duration-300 disabled:opacity-50"
            >
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
