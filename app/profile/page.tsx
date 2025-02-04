"use client";
import React, { useEffect, useState } from "react";
import Navbar from "../component/Navbar/navbar";
import Image from "next/image";
import { tokenDecode } from "../lib/jwtDecode";
import { JwtPayload } from "jwt-decode";
import { DecodedToken } from "../lib/types/DecodedToken";
import { GetUserData } from "../lib/API/GetUserAPI";
export default function Profile() {
  const [data, setData] = useState<undefined | DecodedToken>(undefined);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    // setData(GetUserData());

    GetUserData().then((data) => {
      console.log(data);
      setData(data);
    });
  }, []);
  return (
    <div>
      <Navbar />
      <div className="  flex justify-center items-center">
        <div className="bg-white rounded-lg p-8 w-full max-w-4xl shadow-lg">
          <div className="flex mt-8">
            <div className="w-48 h-48 rounded-lg">
              <Image
                src="/logo_eng.svg"
                alt="logo"
                width={500}
                height={500}
                className="object-contain"
              />
            </div>
            <div className="ml-8 space-y-4">
              <div className="text-2xl font-bold">
                {data?.first_name} {data?.last_name}
              </div>
              <div className="text-lg">
                <span className="font-bold">Student code:</span>{" "}
                {data?.student_id}
              </div>
              <div className="text-lg">
                <span className="font-bold">Faculty:</span> {data?.faculty}
              </div>
              <div className="text-lg">
                <span className="font-bold">Point:</span> {data?.points}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
