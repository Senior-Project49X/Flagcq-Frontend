"use client";

import { useState } from "react";
import Image from "next/image";
import GeneralSkills from "./question/GeneralSkills";
import Cryptography from "./question/Cryptography";
import Forensics from "./question/Forensics";
import Network from "./question/Network";

export default function Category() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category);
  };

  return (
    <div className="bg-[#090147] py-4 px-8 min-h-screen flex justify-center relative">
      {/* Main container: Category on left and questions on the right */}
      <div className="flex space-x-8 w-full max-w-7xl">
        {/* Category Box */}
        <div className="border-4 border-red-500 rounded-lg p-6 w-64 -ml-40 relative h-3/6">
          {/* Category Header */}
          <div className="flex items-center space-x-4 mb-4 mx-4">
            <Image
              src="/category.svg"
              alt="Category logo"
              width={50}
              height={50}
              className="object-contain"
            />
            <h1 className="text-red-400 text-xl font-bold">Category</h1>
          </div>

          {/* Category List */}
          <div className="flex flex-col space-y-4">
            <button
              onClick={() => handleCategoryClick("All Categories")}
              className="bg-[#0c0332] text-white py-2 px-4 rounded-lg hover:bg-red-500"
            >
              All Categories
            </button>
            <button
              onClick={() => handleCategoryClick("General Skills")}
              className="bg-[#0c0332] text-white py-2 px-4 rounded-lg hover:bg-red-500"
            >
              General Skills
            </button>
            <button
              onClick={() => handleCategoryClick("Cryptography")}
              className="bg-[#0c0332] text-white py-2 px-4 rounded-lg hover:bg-red-500"
            >
              Cryptography
            </button>
            <button
              onClick={() => handleCategoryClick("Network")}
              className="bg-[#0c0332] text-white py-2 px-4 rounded-lg hover:bg-red-500"
            >
              Network
            </button>
            <button
              onClick={() => handleCategoryClick("Forensics")}
              className="bg-[#0c0332] text-white py-2 px-4 rounded-lg hover:bg-red-500"
            >
              Forensics
            </button>
          </div>

          {/*Tournament Button*/}
          <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2">
            <button className="bg-red-500 text-white py-2 px-6 rounded-lg hover:bg-red-600">
              Tournament
            </button>
          </div>
        </div>

        {/*Question Box*/}
        <div className="flex-1 p-6 rounded-lg">
          {/* Display Selected Category Content */}
          {/* {selectedCategory === "All Categories" && <All />} */}
          {selectedCategory === "General Skills" && <GeneralSkills />}
          {selectedCategory === "Cryptography" && <Cryptography />}
          {selectedCategory === "Network" && <Network />}
          {selectedCategory === "Forensics" && <Forensics />}
        </div>
      </div>
    </div>
  );
}
