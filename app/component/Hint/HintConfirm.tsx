import { UseHintAPI } from "@/app/lib/API/QuestionAPI";
import React, { useEffect, useState } from "react";

type state = {
  id: number;
  Topic: string;
  ClosePopup: () => void;
  UserConfirm: () => void;
  isUsed: boolean;
  cost: number;
};
export default function HintConfirm({
  id,
  ClosePopup,
  UserConfirm,
  cost,
  isUsed,
}: Readonly<state>) {
  const [description, setDescription] = useState<string>("");
  const handleShowHint = () => {
    UserConfirm();
  };
  useEffect(() => {
    if (isUsed || cost === 0) {
      const fetchHint = async () => {
        setDescription(await UseHintAPI(id));
      };
      fetchHint();
    }
  }, [isUsed, UserConfirm, cost, id]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-12 max-w-xl w-full text-center relative">
        <button
          onClick={ClosePopup}
          className="absolute top-4 right-4 text-gray-600 hover:text-black font-bold text-2xl"
        >
          X
        </button>
        {isUsed ? (
          <h2 className="text-red-500 font-bold text-2xl mb-4">
            {description}
          </h2>
        ) : (
          <>
            {" "}
            <h2 className="text-red-500 font-bold text-2xl mb-4">
              {cost === 0
                ? `This hint is free but are you sure to use it?`
                : `This hint will cost you ${cost} points`}
            </h2>
            <button
              onClick={handleShowHint}
              className="bg-gray-500 text-white px-6 py-3 rounded-lg font-bold text-xl w-1/2 hover:bg-gray-600"
            >
              Yes, I want to use this hint
            </button>
            <button
              onClick={ClosePopup}
              className="bg-red-500 text-white px-6 py-3 rounded-lg font-bold text-xl w-1/2 hover:bg-red-600"
            >
              No, I don&apos;t want to use this hint
            </button>
          </>
        )}
      </div>
    </div>
  );
}
