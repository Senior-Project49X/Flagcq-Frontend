import React, { FormEvent, useEffect, useRef } from "react";
import { CreateCategoriesAPI } from "../../lib/API/QuestionAPI";
type ModalProps = {
  onClose: (Category: string) => void;
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
      const isOutsideCatefory =
        categoryRef.current &&
        !categoryRef.current.contains(event.target as Node);
      if (isOutsideCatefory) onClose("");
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  return (
    <div>
      <div className=" justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-40">
        <div
          className="flex border-0 rounded-lg shadow-lg  bg-white outline-none focus:outline-none p-5"
          ref={categoryRef}
        >
          <div className=" justify-center text-center ">
            <p className="text-2xl font-bold">Create New Category</p>
            <form
              onSubmit={onCreateCategories}
              className="flex flex-col  items-center "
            >
              <input
                type="text"
                name="Category"
                className="ml-2 border-2 border-stone-950 rounded-md p-1"
              />
              <button type="submit" className="buttonSubmit mt-3">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
      <div className="opacity-40 fixed inset-0 z-30 bg-black cursor-auto" />
    </div>
  );
}
