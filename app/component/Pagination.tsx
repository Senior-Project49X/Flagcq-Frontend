import React from "react";
import Link from "next/link";

type PageNumberProps = {
  pagePath: string;
  pageNumber: string | null;
  totalPages: number;
  hasNextPage: boolean;
};

export default function Pagination({
  pageNumber,
  pagePath,
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
      <div className="flex gap-2 bg-white rounded-lg px-4 py-2 text-center">
        {currentPage > 1 && (
          <Link href={`${pagePath}${currentPage - 1}`} scroll={false}>
            {"<<"}
          </Link>
        )}

        {visiblePages.map((page, index) => (
          <React.Fragment key={page}>
            {index === 0 && page > 1 && (
              <React.Fragment>
                <Link
                  href={`${pagePath}1`}
                  scroll={false}
                  className="flex text-gray-600"
                >
                  1
                </Link>

                {page > 3 && <span>...</span>}
              </React.Fragment>
            )}

            <Link
              href={`${pagePath}${page}`}
              scroll={false}
              className={`px-4 py-2 ${
                page === currentPage
                  ? "bg-blue-600 text-white rounded-full border border-blue-600"
                  : "text-gray-600 border border-sky-500 rounded-full"
              }`}
            >
              {page}
            </Link>

            {index === visiblePages.length - 1 && page < totalPages && (
              <React.Fragment>
                {page < totalPages - 1 && <span>...</span>}
                <Link
                  href={`${pagePath}${totalPages}`}
                  scroll={false}
                  className="w-8 h-8 p-0 text-gray-600"
                >
                  {totalPages}
                </Link>
              </React.Fragment>
            )}
          </React.Fragment>
        ))}

        {hasNextPage && currentPage < totalPages && (
          <Link href={`${pagePath}${currentPage + 1}`} scroll={false}>
            {">>"}
          </Link>
        )}
      </div>
    </div>
  );
}
