"use client";
import React from "react";
import { useEffect } from "react";
import { redirect, useSearchParams } from "next/navigation";
// import { useRouter } from "next/router";
export default function cmuOAuthCallback() {
  // const router = useRouter();
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const searchParams = useSearchParams();
  const search = searchParams.get("code");
  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    console.log(search);
    const loginDetails = {
      token: search, // Example token, can be generated as needed
      timestamp: new Date().toISOString(), // Store timestamp of creation
    };
    localStorage.setItem("login", JSON.stringify(loginDetails));
    redirect("/");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}
