"use client";
import React, { useState } from "react";
import HintConfirm from "./HintConfirm";

type Hint = {
  id: number;
  index: number;
  description: string;
  penalty: number;
  used: boolean;
  isLast: boolean;
};

export default function Hint({
  id,
  index,
  description,
  penalty,
  used,
  isLast,
}: Readonly<Hint>) {
  const [showConfirm, setShowConfirm] = useState<boolean>(false);
  const [showHint, setShowHint] = useState<boolean>(false);
  const handleShowHint = () => {
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
        <HintConfirm ClosePopup={CloseModal} cost={penalty} Topic="SomeTopic" />
      )}

      <button
        key={id}
        type="button"
        onClick={used ? handleShowHint : handleShowConfirm}
        className={`px-4 py-2 text-white bg-blue-500 border border-blue-500 ${
          index === 0 ? "rounded-l-md" : ""
        } ${isLast ? "rounded-r-md" : ""} hover:bg-blue-600`}
      >
        {index + 1}
      </button>
    </div>
  );
}
