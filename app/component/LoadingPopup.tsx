import React, { Dispatch, SetStateAction } from "react";
import Image from "next/image";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";

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
          className="relative w-auto my-6 mx-auto max-w-md"
          onMouseDown={(e) => e.stopPropagation()}
        >
          <div className="relative bg-gray-800 rounded-xl shadow-2xl border-2 border-opacity-20 border-white">
            {/* Header */}
            <div className="p-6">
              {isFailed ? (
                // Error State
                <div className="flex flex-col items-center">
                  <FaTimesCircle className="w-16 h-16 text-red-500 mb-4" />
                  <h2 className="text-xl font-bold text-white mb-2">Error</h2>
                  <p className="text-gray-300 text-center">{Message}</p>
                </div>
              ) : isSuccess ? (
                // Success State
                <div className="flex flex-col items-center">
                  <FaCheckCircle className="w-16 h-16 text-green-500 mb-4" />
                  <h2 className="text-xl font-bold text-white mb-2">
                    Success!
                  </h2>
                  <p className="text-gray-300">
                    Operation completed successfully
                  </p>
                </div>
              ) : (
                // Loading State
                <div className="flex flex-col items-center">
                  <div className="relative">
                    <Image
                      src="/ring-resize.svg"
                      alt="Loading"
                      width={64}
                      height={64}
                      className="animate-spin"
                    />
                  </div>
                  <h2 className="text-xl font-bold text-white mt-4">
                    Loading...
                  </h2>
                  <p className="text-gray-300 text-sm mt-2">Please wait</p>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="bg-gray-900 px-6 py-4 rounded-b-xl">
              <button
                className={`w-full py-2 rounded-lg transition-all duration-300 font-semibold
                  ${
                    isFailed
                      ? "bg-red-500 hover:bg-red-600 text-white"
                      : isSuccess
                      ? "bg-green-500 hover:bg-green-600 text-white"
                      : "bg-blue-500 hover:bg-blue-600 text-white"
                  }`}
                onClick={onClose}
              >
                {isFailed ? "Try Again" : isSuccess ? "Continue" : "Cancel"}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Backdrop */}
      <div className="fixed inset-0 z-40 bg-black bg-opacity-75 backdrop-blur-sm"></div>
    </>
  );
}
