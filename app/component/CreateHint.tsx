import React from "react";

type Hint = {
  index: number;
  detail: string;
  handleHintChange: (index: number, field: string, value: any) => void;
  removeHint: (index: number) => void;
  penalty: number;
};

export default function CreateHint({
  index,
  detail,
  handleHintChange,
  removeHint,
  penalty,
}: Readonly<Hint>) {
  return (
    <div>
      <div className="mb-4">
        <label>
          Detail:
          <textarea
            className="w-full p-2 border border-gray-300 rounded"
            value={detail}
            onChange={(e) => handleHintChange(index, "detail", e.target.value)}
          />
        </label>
        <br />
        <label>
          Penalty:
          <input
            type="number"
            min="0"
            max="10000000"
            className="w-full p-2 border border-gray-300 rounded"
            value={penalty}
            onChange={(e) => handleHintChange(index, "penalty", e.target.value)}
            onKeyDown={(e) => {
              if (
                e.key === "e" ||
                e.key === "E" ||
                e.key === "+" ||
                e.key === "-"
              )
                e.preventDefault();
            }}
          />
        </label>
        <button type="button" onClick={() => removeHint(index)}>
          Remove
        </button>
      </div>
    </div>
  );
}
