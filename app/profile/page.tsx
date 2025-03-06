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
    <div className="min-h-screen ">
      <Navbar />
      <div className="flex justify-center items-center mt-10">
        <div className="bg-gray-800 rounded-lg p-8 w-full max-w-4xl shadow-2xl border-2 border-green-500 ">
          <div className="flex mt-2">
            {/* Profile Image */}
            <div className="w-48 h-48 rounded-lg bg-white border-4 border-green-500 shadow-lg overflow-hidden">
              <Image
                src="/logo_eng.svg"
                alt="logo"
                width={500}
                height={500}
                className="object-contain p-4"
              />
            </div>

            {/* Profile Details */}
            <div className="ml-8 space-y-4">
              {/* Name */}
              <div className="text-4xl font-bold text-green-500">
                {data?.first_name} {data?.last_name}
              </div>

              {/* Student Code */}
              <div className="text-lg text-gray-300">
                <span className="font-bold text-green-400">Student Code:</span>{" "}
                {data?.student_id}
              </div>

              {/* Faculty */}
              <div className="text-lg text-gray-300">
                <span className="font-bold text-green-400">Faculty:</span>{" "}
                {data?.faculty}
              </div>

              {/* Role */}
              <div className="text-lg text-gray-300">
                <span className="font-bold text-green-400">Role:</span>{" "}
                {userRole}
              </div>

              {/* Points */}
              <div className="text-lg text-gray-300">
                <span className="font-bold text-green-400">Points:</span>{" "}
                {data?.points}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
