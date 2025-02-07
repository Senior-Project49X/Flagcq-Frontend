import React from "react";

interface ModeFilterProps {
  Mode: string;
  setMode: (mode: string) => void;
}

export default function ModeFilter({
  setMode,
  Mode,
}: Readonly<ModeFilterProps>) {
  const mode = ["Practice", "Tournament", "Unpublished"];

  return (
    <div className=" grid grid-cols-3 gap-6 px-16">
      {mode.map((displayMode) => (
        <button
          key={displayMode}
          onClick={() => {
            if (Mode === displayMode) setMode("");
            else setMode(displayMode);
          }}
          className={`${
            Mode === displayMode ? "bg-gray-900" : "bg-gray-800"
          } text-white py-2 px-4 rounded-lg hover:bg-gray-900 bg-[#0c0332] `}
        >
          {displayMode}
        </button>
      ))}
    </div>
  );
}
// className =
//   "bg-gray-800 text-white py-2 px-4 rounded-lg w-full text-left h-12 border-green-300 border-2";
