import React, { FormEvent } from "react";
import { EditCategoryAPI } from "../../lib/API/QuestionAPI";
type ModalProps = {
  id: string;
};
export default function EditCategories({ id }: Readonly<ModalProps>) {
  const onCreateCategories = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    const category = formData.get("Category");
    if (category && typeof category === "string") {
      const categoryId = await EditCategoryAPI(category, parseInt(id));
      console.log("categoryId", categoryId);
    } else {
    }
  };
  return (
    <>
      <button className=" justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <button
          className="select-text cursor-auto relative w-auto my-6 mx-auto max-w-3xl"
          onMouseDown={(e) => e.stopPropagation()}
        >
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
              <form onSubmit={onCreateCategories}>
                <input
                  type="text"
                  name="Category"
                  className="ml-2 text-red-400 border-2 border-stone-950 rounded-md p-1  "
                />
                <button type="submit">Submit</button>
              </form>
            </div>
          </div>
        </button>
      </button>
      <button className="opacity-40 fixed inset-0 z-40 bg-black cursor-auto"></button>
    </>
  );
}
