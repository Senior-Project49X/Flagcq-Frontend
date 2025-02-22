"use client";
import React, { useEffect, useState } from "react";
import Navbar from "../component/Navbar/navbar";
import Image from "next/image";
import { DecodedToken } from "../lib/types/DecodedToken";
import { GetUserData } from "../lib/API/GetUserAPI";

export default function Profile() {
  const [data, setData] = useState<undefined | DecodedToken>(undefined);
  const [userRole, setUserRole] = useState<string>("");

  useEffect(() => {
    // Fetch user data
    GetUserData().then((data) => {
      console.log(data);
      setData(data);
    });

    // Read user-role from cookies
    const cookies = document.cookie.split("; ").reduce((acc, cookie) => {
      const [name, value] = cookie.split("=");
      acc[name] = value;
      return acc;
    }, {} as Record<string, string>);

    setUserRole(cookies["user-role"] || "Unknown");
  }, []);

  return (
    <div>
      <Navbar />
      <div className="flex justify-center items-center mt-10">
        <div className="bg-gray-800 rounded-lg p-8 w-full max-w-4xl shadow-lg">
          <div className="flex mt-8">
            <div className="w-48 h-48 rounded-lg bg-white">
              <Image
                src="/logo_eng.svg"
                alt="logo"
                width={500}
                height={500}
                className="object-contain"
              />
            </div>
            <div className="ml-8 space-y-2 text-green-500">
              <div className="text-2xl font-bold">
                {data?.first_name} {data?.last_name}
              </div>
              <div className="text-lg">
                <span className="font-bold text-white">Student code:</span>{" "}
                {data?.student_id}
              </div>
              <div className="text-lg">
                <span className="font-bold text-white">Faculty:</span>{" "}
                {data?.faculty}
              </div>
              <div className="text-lg">
                <span className="font-bold text-white">Role:</span> {userRole}
              </div>
              <div className="text-lg">
                <span className="font-bold text-white">Point:</span>{" "}
                {data?.points}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
