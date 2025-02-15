import React, { FormEvent, useEffect, useRef } from "react";
import { DeleteCategoryAPI } from "../../lib/API/QuestionAPI";
type ModalProps = {
  id: string;
  onClose: (Category: string) => void;
};
export default function DeleteCategories({
  id,
  onClose,
}: Readonly<ModalProps>) {
  const DeleteCategoryRef = useRef<HTMLDivElement>(null);
  const onDeleteCategories = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    await DeleteCategoryAPI(parseInt(id));
    onClose("");
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const isOutsideCategory =
        DeleteCategoryRef.current &&
        !DeleteCategoryRef.current.contains(event.target as Node);
      if (isOutsideCategory) onClose(id);
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose, id]);
  return (
    <div>
      <div className=" justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-40">
        <div
          className="flex border-0 rounded-lg shadow-lg  bg-white outline-none focus:outline-none p-5"
          ref={DeleteCategoryRef}
        >
          <div className=" justify-center text-center ">
            <p className="text-2xl font-bold">Delete Category</p>
            <p className="text-lg font-bold text-red-500">
              are you sure to delete this category?
              <p className="text-lg font-bold text-red-500">
                This action will permanently delete the category and its
                associated questions.
              </p>
            </p>
            <form
              onSubmit={onDeleteCategories}
              className="flex flex-col  items-center "
            >
              <button type="submit" className="buttonWarning mt-3">
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
