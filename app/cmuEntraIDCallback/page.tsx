"use client";
import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { LoginUser } from "../lib/API/LoginAPI";

export default function CmuOAuthCallback() {
  const searchParams = useSearchParams();
  const code = searchParams.get("code");

  useEffect(() => {
    if (!code) return;
    LoginUser(code);
  }, [code]);
}
