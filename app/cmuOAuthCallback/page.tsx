"use client";
import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";
import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { setCookie, removeCookie } from "../lib/cookies";
import { LoginUser } from "../lib/API/LoginAPI";

export default function CmuOAuthCallback() {
  const ip = process.env.NEXT_PUBLIC_IP_URL;
  const searchParams = useSearchParams();
  const code = searchParams.get("code");

  useEffect(() => {
    if (!code) return;

    // Save login details in localStorage
    LoginUser(code);

    // axios
    //   .post(`${ip}/api/oauth-login`, { authorizationCode: code })
    //   .then((resp) => {
    //     console.log(resp);
    //     console.log(resp.data);

    //     if (resp.status === 200) {
    //       removeCookie("cmu-oauth-token");
    //       setCookie("cmu-oauth-token", resp.data.token);

    //       window.location.href = "/";
    //     } else {
    //       // Handle login failure (optional)
    //       console.error("Login failed:", resp.data);
    //     }
    //   })
    //   .catch((error) => {
    //     console.error("Error during login:", error);
    //     // Optionally notify the user of the error
    //   });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Added code to the dependency array
}
