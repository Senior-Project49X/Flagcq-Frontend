"use client";
import Image from "next/image";

interface CategoryProps {
  selectedCategory: string | null;
  onCategoryClick: (category: string) => void;
}

export default function Category({
  selectedCategory,
  onCategoryClick,
}: CategoryProps) {
  return (
    <div className="bg-[#090147] px-8 py-4 flex justify-center relative h3/6">
      {/* Main container: Category on the left */}
      <div className="flex space-x-8 w-full max-w-7xl">
        {/* Category Box */}
        <div className=" rounded-lg p-6 w-64  relative h-full">
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
              onClick={() => onCategoryClick("All Categories")}
              className={`${
                selectedCategory === "All Categories"
                  ? "bg-red-500"
                  : "bg-[#0c0332]"
              } text-white py-2 px-4 rounded-lg hover:bg-red-500`}
            >
              All Categories
            </button>
            <button
              onClick={() => onCategoryClick("GeneralSkills")}
              className={`${
                selectedCategory === "GeneralSkills"
                  ? "bg-red-500"
                  : "bg-[#0c0332]"
              } text-white py-2 px-4 rounded-lg hover:bg-red-500`}
            >
              General Skills
            </button>
            <button
              onClick={() => onCategoryClick("Cryptography")}
              className={`${
                selectedCategory === "Cryptography"
                  ? "bg-red-500"
                  : "bg-[#0c0332]"
              } text-white py-2 px-4 rounded-lg hover:bg-red-500`}
            >
              Cryptography
            </button>
            <button
              onClick={() => onCategoryClick("Network")}
              className={`${
                selectedCategory === "Network" ? "bg-red-500" : "bg-[#0c0332]"
              } text-white py-2 px-4 rounded-lg hover:bg-red-500`}
            >
              Network
            </button>
            <button
              onClick={() => onCategoryClick("Forensics")}
              className={`${
                selectedCategory === "Forensics" ? "bg-red-500" : "bg-[#0c0332]"
              } text-white py-2 px-4 rounded-lg hover:bg-red-500`}
            >
              Forensics
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
