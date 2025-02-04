"use client";

import { redirect } from "next/navigation";
import { removeCookie } from "../lib/cookies";
import { useEffect, useState } from "react";
import Link from "next/link";
import { LogoutUser } from "../lib/API/LoginAPI";

export default function LogoutPage() {
  useEffect(() => {
    LogoutUser();
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen ">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center">
        <h1 className="text-4xl font-bold text-red-500 mb-4">
          Redirect to Microsoft Sign out in
        </h1>
        <p className="text-gray-700 mb-8">or you can Redirect immediately.</p>
        <Link
          href={process.env.NEXT_PUBLIC_CMU_ENTRAID_LOGOUT_URL ?? "/login"}
          className="bg-blue-500 text-white px-6 py-3 rounded-lg font-bold text-lg hover:bg-blue-600"
        >
          Go back home
        </Link>
      </div>
    </div>
  );
}
