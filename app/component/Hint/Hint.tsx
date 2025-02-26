"use client";
import React, { useState } from "react";
import HintConfirm from "./HintConfirm";
import { UseHintAPI } from "@/app/lib/API/QuestionAPI";

type Hint = {
  id: number;
  index: number;
  description: string;
  penalty: number;
  used: boolean;
  isLast: boolean;
  tournamentId?: number;
};

export default function Hint({
  id,
  index,
  description,
  penalty,
  used,
  isLast,
  tournamentId,
}: Readonly<Hint>) {
  const [showConfirm, setShowConfirm] = useState<boolean>(false);
  const [showHint, setShowHint] = useState<boolean>(false);
  const [hintUsed, setHintUsed] = useState<boolean>(used);
  const [hintDescription, setHintDescription] = useState<string>(description);
  const handleShowHint = () => {
    console.log("id", UseHintAPI(id));

    setHintUsed(true);
    setShowHint(true);
  };

  const handleShowConfirm = () => {
    setShowConfirm(true);
  };

  const CloseModal = () => {
    setShowConfirm(false);
  };

  return (
    <div>
      {showConfirm && (
        <HintConfirm
          id={id}
          ClosePopup={CloseModal}
          UserConfirm={handleShowHint}
          cost={penalty}
          isUsed={hintUsed}
          tournamentId={tournamentId}
          Topic="SomeTopic"
        />
      )}

      <button
        key={id}
        type="button"
        onClick={handleShowConfirm}
        className={`px-4 py-2 text-white ${
          hintUsed || penalty === 0
            ? "bg-green-500 hover:bg-green-600"
            : "bg-blue-500 hover:bg-blue-600"
        }   ${index === 0 ? "rounded-l-md" : ""} ${
          isLast ? "rounded-r-md" : ""
        } `}
      >
        {index + 1}
      </button>
    </div>
  );
}
