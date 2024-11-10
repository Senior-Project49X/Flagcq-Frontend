import React from "react";

export default function loginButton() {
  return (
    <a href={process.env.NEXT_PUBLIC_CMU_OAUTH_URL}>
      <button className="bg-blue-500 text-white text-lg py-2 px-8 rounded-full mb-4 hover:bg-blue-600 transition-colors">
        Login
      </button>
    </a>
  );
}
