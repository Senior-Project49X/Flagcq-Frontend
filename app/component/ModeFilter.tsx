import React from "react";

interface ModeFilterProps {
  Mode: string;
  setMode: (mode: string) => void;
  handleModeChange: () => void;
}

export default function ModeFilter({
  setMode,
  Mode,
  handleModeChange,
}: Readonly<ModeFilterProps>) {
  const mode = ["Practice", "Tournament", "Unpublished"];

  return (
    <div className="grid grid-cols-3 gap-6 px-8 text-center  mx-8">
      {mode.map((displayMode) => (
        <button
          key={displayMode}
          onClick={() => {
            if (Mode === displayMode) setMode("");
            else {
              setMode(displayMode);
              handleModeChange();
            }
          }}
          className={`${
            Mode === displayMode ? "bg-gray-900" : "bg-gray-800"
          } text-white py-2 w-full rounded-lg hover:bg-gray-900 bg-[#0c0332]`}
        >
          {displayMode}
        </button>
      ))}
    </div>
  );
}
