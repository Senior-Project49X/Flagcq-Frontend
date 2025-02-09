import React from "react";
interface AdminTournamentSelectedProps {
  is_selected?: boolean;
}
export default function AdminTournamentSelected({
  is_selected,
}: Readonly<AdminTournamentSelectedProps>) {
  return (
    <div>
      <div className="absolute inset-x-0 -top-6 flex  items-center justify-center z-10">
        <div
          className={`rounded-lg ${
            is_selected ? "bg-red-400" : "bg-green-400"
          }  py-1 px-3  flex  text-black text-xl `}
        >
          {is_selected ? "Already in Tournament" : "✓"}
        </div>
      </div>
    </div>
  );
}
