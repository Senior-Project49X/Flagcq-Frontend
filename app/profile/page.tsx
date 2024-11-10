"use client";
import React, { useEffect, useState } from "react";
import Navbar from "../navbar";
import { getUserInfo } from "../lib/profileAPI";
import { tokenDecode } from "../lib/jwtDecode";
import { JwtPayload } from "jwt-decode";
import { DecodedToken } from "../lib/types/DecodedToken";
export default function profile() {
  const [data, setData] = useState<undefined | DecodedToken>(undefined);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    setData(tokenDecode());
    console.log(tokenDecode());
  }, []);
  return (
    <div>
      <Navbar />
      <div className="  flex justify-center items-center">
        <div className="bg-white rounded-lg p-8 w-full max-w-4xl shadow-lg">
          <div className="flex mt-8">
            <div className="w-48 h-48 rounded-lg">photo</div>
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
