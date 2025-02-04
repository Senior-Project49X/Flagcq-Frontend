"use client";

import { useState, useEffect } from "react";
import TeamLeaderboardAdmin from "./admin";
import TeamLeaderboardUser from "./user";
import { isRoleAdmin } from "../../lib/role";

// Define types for the leaderboard data and team data

export default function TeamLeaderboard() {
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [mode, setMode] = useState<string>("");

  useEffect(() => {
    const role = isRoleAdmin();
    setIsAdmin(role);
    if (!role) {
      setMode("");
    }
  }, []);
  return (
    <div>{isAdmin ? <TeamLeaderboardAdmin /> : <TeamLeaderboardUser />}</div>
  );
}
