"use client";

import { useEffect } from "react";
import { redirect, useSearchParams } from "next/navigation";

export default function cmuOAuthCallback() {
  // const router = useRouter();
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const searchParams = useSearchParams();
  const search = searchParams.get("code");
  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    const loginDetails = {
      token: search, // Example token, can be generated as needed
      timestamp: new Date().toISOString(), // Store timestamp of creation
    };
    localStorage.setItem("login", JSON.stringify(loginDetails));
    redirect("/");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}
