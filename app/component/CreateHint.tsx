import React from "react";
import dynamic from "next/dynamic";
const RichTextEditor = dynamic(() => import("@/app/component/RichTextEditor"), {
  loading: () => <p>Loading...</p>,
  ssr: false,
});

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
      <div className="mb-2  border border-gray-300 rounded p-4">
        <label>
          Detail:
          {/* <textarea
            className="w-full p-2 border border-gray-300 rounded"
            value={detail}
            onChange={(e) => handleHintChange(index, "detail", e.target.value)}
            required
          /> */}
        </label>
        <RichTextEditor
          value={detail}
          onChange={(value) => handleHintChange(index, "detail", value)}
        />
        <br />
        <label>
          Penalty:
          <input
            type="number"
            min="0"
            max="10000000"
            className="w-full p-2 border border-gray-300 rounded bg-white text-black"
            value={penalty}
            required
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
        <button
          type="button"
          className="p-2 border rounded border-gray-300 mb-1 mt-1 bg-red-500 text-white hover:bg-red-600 transition-colors duration-100 "
          onClick={() => removeHint(index)}
        >
          Remove
        </button>
      </div>
    </div>
  );
}
