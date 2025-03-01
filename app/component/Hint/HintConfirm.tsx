import React, { use, useEffect, useState } from "react";
import { FaExclamationTriangle, FaTimes } from "react-icons/fa";
import { UseHintAPI } from "@/app/lib/API/QuestionAPI";
import LoadingPopup from "../LoadingPopup";

interface HintConfirmProps {
  id: number;
  Topic?: string;
  ClosePopup: () => void;
  UserConfirm: () => void;
  isUsed: boolean;
  cost: number;
  tournamentId?: number;
}

export default function HintConfirm({
  id,
  ClosePopup,
  UserConfirm,
  cost,
  isUsed,
  tournamentId,
}: Readonly<HintConfirmProps>) {
  const [description, setDescription] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [isFailed, setIsFailed] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  useEffect(() => {
    if (isUsed || cost === 0) {
      const fetchHint = async () => {
        setIsLoading(true);
        try {
          const hint = await UseHintAPI(
            id,
            {
              setIsFailed,
              setMessage,
              setIsSuccess,
            },
            tournamentId
          );
          setDescription(hint);
        } catch (error) {
          console.error("Error fetching hint:", error);
        } finally {
          setIsLoading(false);
        }
      };
      fetchHint();
    }
  }, [isUsed, cost, id, tournamentId]);
  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="relative bg-gray-800 rounded-xl p-8 max-w-md w-full mx-4 border border-gray-700">
        <button
          onClick={ClosePopup}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-100 transition-colors"
        >
          <FaTimes size={24} />
        </button>

        {isUsed ? (
          <div className="space-y-4">
            {isFailed && (
              <div className="flex items-center justify-center py-8">
                <div className="h-8 w-8 border-4 border-t-yellow-500 border-gray-700 rounded-full animate-spin" />
                <LoadingPopup
                  setLoading={setIsLoading}
                  setFailedforhint={setIsFailed}
                  setSuccessforhint={setIsSuccess}
                  isFailed={isFailed}
                  isSuccess={isSuccess}
                  Message={message}
                  ClosePopup={ClosePopup}
                />
              </div>
            )}
            {isSuccess && (
              <>
                <div
                  className="text-red-500 font-bold text-2xl mb-4 leading-relaxed break-words rich-text overflow-y-auto"
                  dangerouslySetInnerHTML={{ __html: description }}
                />
              </>
            )}
          </div>
        ) : (
          <div className="text-center">
            <h2 className="text-red-500 font-bold text-2xl mb-4">
              {cost === 0
                ? "This hint is free but are you sure to use it?"
                : `This hint will cost you ${cost} points`}
            </h2>

            <FaExclamationTriangle className="text-5xl text-yellow-500 mx-auto mb-4" />

            <h2 className="text-red-500 font-bold text-2xl mb-4">
              Confirm Use
            </h2>

            <p className="mb-6 text-gray-300">
              Are you sure you want to use hint?
              <br />
              <span className="text-red-400">
                This action cannot be undone.
              </span>
            </p>

            <div className="flex justify-center gap-4">
              <button
                onClick={ClosePopup}
                className="px-6 py-3 rounded-lg bg-gray-600 text-white hover:bg-gray-700 transition-all duration-300"
              >
                Cancel
              </button>
              <button
                onClick={UserConfirm}
                className="px-6 py-3 rounded-lg bg-green-500 text-black hover:bg-green-600 transition-all duration-300"
              >
                Yes, I want to use this hint
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
