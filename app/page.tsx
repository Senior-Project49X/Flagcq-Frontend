"use client";

import { useState, useEffect } from "react";
import { redirect } from "next/navigation";
import Homepage from "./homepage/homepage";

export default function Home() {
  const [isLogin, setIsLogin] = useState(false);
  const [loading, setLoading] = useState(true); // Add loading state
  useEffect(() => {
    console.log(!localStorage.getItem("login"));
    if (!localStorage.getItem("login")) {
      setIsLogin(false);
    } else {
      setIsLogin(true);
    }
    setLoading(false);
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return <div>{isLogin ? <Homepage /> : redirect("/login")}</div>;
}
