import React, { FormEvent, useEffect, useRef, useState } from "react";
import { EditCategoryAPI } from "../../lib/API/QuestionAPI";
type ModalProps = {
  name: string | undefined;
  id: string;
  onClose: (Category: string) => void;
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
      const isOutsideCatefory =
        EditCategoryRef.current &&
        !EditCategoryRef.current.contains(event.target as Node);
      if (isOutsideCatefory) onClose(id);
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
          ref={EditCategoryRef}
        >
          <div className=" justify-center text-center ">
            <p className="text-2xl font-bold">Edit Category</p>
            <form
              onSubmit={onEditCategories}
              className="flex flex-col  items-center "
            >
              <input
                value={categories}
                onChange={(event) => setCategories(event.target.value)}
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
