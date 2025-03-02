"use client";

import { useState, useEffect } from "react";
import Homepage from "../homepage/homepage";
import { loginChecker } from "../lib/login";
import LoadingComponent from "../component/LoadingComponent";
export default function Home() {
  const [loading, setLoading] = useState(true); // Add loading state
  useEffect(() => {
    loginChecker(setLoading);
  }, [loading]);

  if (loading) {
    return <LoadingComponent />;
  }

  return (
    <div>
      <Homepage />
    </div>
  );
}
