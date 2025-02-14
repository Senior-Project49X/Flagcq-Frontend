"use client";
import React from "react";
import CreateTournament from "../CreateTournament/page";
import { useSearchParams } from "next/navigation";

export default function Page() {
  const searchParams = useSearchParams();
  const id = searchParams.get("TournamentID");

  return (
    <div>
      <CreateTournament tournament_id={Number(id)} />
    </div>
  );
}
