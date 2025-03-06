import React from "react";

export default function loginButton() {
  return (
    <a href={process.env.CMU_ENTRAID_URL}>
      <button className="bg-green-500 text-black font-bold py-3 px-6 rounded-lg transition duration-300 hover:bg-green-600 hover:shadow-lg hover:shadow-green-500/50">
        Login
      </button>
    </a>
  );
}
