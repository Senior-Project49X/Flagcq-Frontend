"use client";

import { useState, useEffect } from "react";
import TeamLeaderboardAdmin from "./admin";
import TeamLeaderboardUser from "./user";
import { isRoleAdmin } from "../../lib/role";
import LoadingComponent from "@/app/component/LoadingComponent";

// Define types for the leaderboard data and team data

export default function TeamLeaderboard() {
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);

  useEffect(() => {
    setIsAdmin(isRoleAdmin());
  }, []);

  if (isAdmin === null) {
    return <LoadingComponent />;
  }

  return (
    <div>{isAdmin ? <TeamLeaderboardAdmin /> : <TeamLeaderboardUser />}</div>
  );
}
