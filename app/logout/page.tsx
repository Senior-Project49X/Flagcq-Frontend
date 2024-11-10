"use client";

import { redirect } from "next/navigation";
import { removeCookie } from "../lib/cookies";
export default function page() {
  // eslint-disable-next-line react-hooks/rules-of-hooks

  removeCookie("cmu-oauth-token");
  redirect("/login");
  // eslint-disable-next-line react-hooks/exhaustive-deps
}
