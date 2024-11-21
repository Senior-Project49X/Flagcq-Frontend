import React from "react";
import Link from "next/link";
type pageNumber = {
  pagePath: string;
  pageNumber: string | null;
};

export default function Pagination({
  pageNumber,
  pagePath: pageName,
}: pageNumber) {
  return (
    <div className="flex justify-center mt-6">
      <div className="flex gap-2 bg-white rounded-lg px-4 py-2">
        {[1, 2, 3].map((page) => (
          <Link
            href={`${pageName}${page}`}
            key={page}
            className={`w-8 h-8 p-0 ${
              page.toString() === pageNumber ||
              (pageNumber == undefined && page == 1)
                ? "bg-blue-600"
                : "text-gray-600"
            }`}
          >
            {page}
          </Link>
        ))}
      </div>
    </div>
  );
}
