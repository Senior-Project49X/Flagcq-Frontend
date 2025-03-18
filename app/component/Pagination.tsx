import React from "react";
import { handleUpdateParameter } from "../lib/setParameter";

type PageNumberProps = {
  pageNumber: string | null;
  totalPages: number;
  hasNextPage: boolean;
};

export default function Pagination({
  pageNumber,
  totalPages,
  hasNextPage,
}: Readonly<PageNumberProps>) {
  const currentPage = pageNumber ? parseInt(pageNumber) : 1;
  const maxVisiblePages = 5;

  const generatePageNumbers = () => {
    if (totalPages <= maxVisiblePages) {
      return generateAllPages();
    } else if (currentPage <= 3) {
      return generateInitialPages();
    } else if (currentPage > 3 && currentPage < totalPages - 2) {
      return generateMiddlePages();
    } else {
      return generateFinalPages();
    }
  };

  const generateAllPages = () => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) pages.push(i);
    return pages;
  };

  const generateInitialPages = () => {
    const pages = [];
    for (let i = 1; i <= maxVisiblePages; i++) pages.push(i);
    return pages;
  };

  const generateMiddlePages = () => {
    const pages = [];
    for (let i = currentPage - 2; i <= currentPage + 2; i++) pages.push(i);
    return pages;
  };

  const generateFinalPages = () => {
    const pages = [];
    for (let i = totalPages - maxVisiblePages + 1; i <= totalPages; i++) {
      pages.push(i);
    }
    return pages;
  };

  const visiblePages = generatePageNumbers();

  return (
    <div className="flex justify-center mt-6">
      <div className="flex gap-2 rounded-lg text-center">
        {currentPage > 1 && (
          <button
            onClick={() => handleUpdateParameter("page", currentPage - 1)}
            className="bg-[#0D1B2A] rounded-md bottom-2 px-3 py-2 hover:bg-gray-800 transition-colors text-green-400"
          >
            {"<<"}
          </button>
        )}

        {totalPages > 1 &&
          visiblePages.map((page, index) => (
            <React.Fragment key={page}>
              {index === 0 && page > 1 && (
                <React.Fragment>
                  <button
                    onClick={() => handleUpdateParameter("page", "1")}
                    className="flex bg-gray-800 "
                  >
                    1
                  </button>

                  {page > 3 && <span>...</span>}
                </React.Fragment>
              )}

              <button
                onClick={() => handleUpdateParameter("page", page)}
                className={`px-4 py-2 text-green-400 hover:bg-gray-800 transition-colors ${
                  page === currentPage
                    ? "bg-gray-800  rounded-md text-xl"
                    : " bg-[#0D1B2A] rounded-md"
                }`}
              >
                {page}
              </button>

              {index === visiblePages.length - 1 && page < totalPages && (
                <React.Fragment>
                  {page < totalPages - 1 && <span>...</span>}
                  <button
                    onClick={() => handleUpdateParameter("page", totalPages)}
                    className="w-8 h-8 p-0 text-gray-600 "
                  >
                    {totalPages}
                  </button>
                </React.Fragment>
              )}
            </React.Fragment>
          ))}

        {hasNextPage && currentPage < totalPages && (
          <button
            onClick={() => handleUpdateParameter("page", currentPage + 1)}
            className="bg-[#0D1B2A] rounded-md bottom-2 px-3 py-2 hover:bg-gray-800 transition-colors text-green-400"
          >
            {">>"}
          </button>
        )}
      </div>
    </div>
  );
}
