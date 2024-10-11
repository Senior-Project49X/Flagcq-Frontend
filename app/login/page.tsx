import React from "react";
import Image from "next/image";
import LoginButton from "../component/loginButton";

type setLogin = {
  NowLogin: Function;
};

export default function Login() {
  return (
    <div className="flex items-center justify-center min-h-screen ">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96 text-center">
        <h1 className="text-gray-600 text-xl mb-2">Welcome to</h1>
        <h2 className="text-2xl font-bold text-blue-600 mb-6">FlagConquest</h2>

        <div className="flex justify-center mb-6">
          <Image
            src="/logo-login.svg"
            alt="FlagConquest logo"
            width={50}
            height={50}
            className="w-48 h-48 object-cover"
          />
        </div>

        <LoginButton />

        <p className="text-gray-500 text-sm">Login via cmu OAuth</p>
      </div>
    </div>
  );
}
