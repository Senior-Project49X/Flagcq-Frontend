import React from "react";
type NowLogin = {
  NowLogin: Function;
};
export default function loginButton(param: NowLogin) {
  return (
    <>
      <button
        className="bg-blue-500 text-white text-lg py-2 px-8 rounded-full mb-4 hover:bg-blue-600 transition-colors"
        onClick={() => param.NowLogin(true)}
      >
        Login
      </button>
    </>
  );
}
