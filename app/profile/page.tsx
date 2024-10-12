import React from "react";
import Navbar from "../navbar";

export default function profile() {
  return (
    <div>
      <Navbar />
      <div className="  flex justify-center items-center">
        <div className="bg-white rounded-lg p-8 w-full max-w-4xl shadow-lg">
          <div className="flex mt-8">
            <div className="w-48 h-48 rounded-lg">fewfw</div>
            <div className="ml-8 space-y-4">
              <div className="text-2xl font-bold">
                FirstName <span className="font-normal">LastName</span>
              </div>
              <div className="text-lg">
                <span className="font-bold">Student code:</span> Your Code
              </div>
              <div className="text-lg">
                <span className="font-bold">Faculty:</span> Your Faculty
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
