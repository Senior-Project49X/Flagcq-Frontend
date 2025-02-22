import React, { FormEvent, useEffect, useRef, useState } from "react";
import { EditCategoryAPI } from "../../lib/API/QuestionAPI";

type ModalProps = {
  name: string | undefined;
  id: string;
  onClose: (category: string) => void;
};

export default function EditCategories({
  name,
  id,
  onClose,
}: Readonly<ModalProps>) {
  const [categories, setCategories] = useState<string | undefined>(name);
  const EditCategoryRef = useRef<HTMLDivElement>(null);

  const onEditCategories = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    const category = formData.get("Category");
    if (category && typeof category === "string") {
      const categoryId = await EditCategoryAPI(category, parseInt(id));
      onClose(categoryId);
    } else {
      onClose("");
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        EditCategoryRef.current &&
        !EditCategoryRef.current.contains(event.target as Node)
      ) {
        onClose(id);
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
        ref={EditCategoryRef}
      >
        <h2 className="text-yellow-400 font-bold text-2xl mb-4">
          Edit Category
        </h2>
        <form
          onSubmit={onEditCategories}
          className="flex flex-col items-center gap-4"
        >
          <input
            value={categories}
            onChange={(event) => setCategories(event.target.value)}
            type="text"
            name="Category"
            className="w-full p-3 rounded-lg border border-gray-600 bg-gray-900 text-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
            placeholder="Enter new category name"
          />
          <div className="flex justify-center gap-4">
            <button
              onClick={() => onClose(id)}
              type="button"
              className="px-6 py-3 rounded-lg bg-gray-600 text-white hover:bg-gray-700 transition-all duration-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-3 rounded-lg bg-yellow-500 text-black hover:bg-yellow-600 transition-all duration-300 disabled:opacity-50"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
