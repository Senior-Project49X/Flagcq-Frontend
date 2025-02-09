import React from "react";
interface AdminTournamentSelectedProps {
  is_selected?: boolean;
}
export default function AdminTournamentSelected({
  is_selected,
}: Readonly<AdminTournamentSelectedProps>) {
  return (
    <div>
      <div className="absolute inset-x-0 top-0  flex  items-center justify-center z-10">
        <div className=" rounded-full bg-green-500 object-cover py-2 px-3  flex items-center justify-center text-black text-xl">
          {is_selected ? "already in Tournament" : "✓"}
        </div>
      </div>
    </div>
  );
}
