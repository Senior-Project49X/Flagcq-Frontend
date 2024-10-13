"use client";

import { useEffect } from "react";
import { redirect } from "next/navigation";

export default function page() {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    localStorage.removeItem("login");
    redirect("/login");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}
