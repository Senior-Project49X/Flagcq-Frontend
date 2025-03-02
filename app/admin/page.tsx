"use client";

import { useState, useEffect } from "react";
import Homepage from "../homepage/homepage";
import { loginChecker } from "../lib/login";
export default function Home() {
  const [loading, setLoading] = useState(true); // Add loading state
  useEffect(() => {
    loginChecker(setLoading);
  }, [loading]);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Loading, please wait...</p>
      </div>
    );
  }

  return (
    <div>
      <Homepage />
    </div>
  );
}
