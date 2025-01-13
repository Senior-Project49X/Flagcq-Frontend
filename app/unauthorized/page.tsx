import React from "react";
import Link from "next/link";

export default function Unauthorized() {
  return (
    <div className="flex items-center justify-center min-h-screen ">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center">
        <h1 className="text-4xl font-bold text-red-500 mb-4">Unauthorized</h1>
        <p className="text-gray-700 mb-8">
          You do not have permission to access this page.
        </p>
        <Link
          href="/"
          className="bg-blue-500 text-white px-6 py-3 rounded-lg font-bold text-lg hover:bg-blue-600"
        >
          Go back home
        </Link>
      </div>
    </div>
  );
}
