import React, { Dispatch, SetStateAction } from "react";
import Image from "next/image";
import { redirect } from "next/navigation";
interface LoadingPopupProps {
  setLoading: Dispatch<SetStateAction<boolean>>;
  isFailed: boolean;
  isSuccess: boolean;
  Message: string;
}
export default function LoadingPopup({
  setLoading,
  isFailed,
  isSuccess,
  Message,
}: LoadingPopupProps) {
  const onClose = () => {
    console.log(isSuccess);
    if (isSuccess) window.location.href = "/";
    else setLoading(false);
  };
  return (
    <>
      <div
        className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
        onMouseDown={() => setLoading(false)}
      >
        <div
          className="relative w-auto my-6 mx-auto max-w-3xl"
          onMouseDown={(e) => e.stopPropagation()}
        >
          {/*content*/}
          <div className="text-black border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none p-6">
            {isFailed ? (
              <>{Message}</>
            ) : isSuccess ? (
              <>Successful</>
            ) : (
              <>
                <div className="flex items-center space-x-4">
                  <Image
                    src="/ring-resize.svg"
                    alt="FlagConquest logo"
                    width={50}
                    height={50}
                    className="object-contain "
                  />
                  <h1 className="text-green-400 text-xl font-bold">
                    Loading...
                  </h1>
                </div>
              </>
            )}

            <div className="bg-gray-300 flex items-center p-6 border-t border-solid border-blueGray-200 rounded-b justify-center">
              <button
                className="absolute mt-6 text-red-500 hover:text-red font-bold text-2xl"
                type="button"
                onClick={() => onClose()}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="opacity-40 fixed inset-0 z-40 bg-black"></div>
    </>
  );
}
