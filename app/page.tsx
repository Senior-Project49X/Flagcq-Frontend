"use client";

import { useState, useEffect } from "react";
import { redirect } from "next/navigation";
import Homepage from "./homepage/homepage";
import { isHasCookie } from "./lib/cookies";
import { loginChecker } from "./lib/login";
export default function Home() {
  const [loading, setLoading] = useState(true); // Add loading state
  useEffect(() => {
    loginChecker(setLoading);
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Homepage />
    </div>
  );
}
