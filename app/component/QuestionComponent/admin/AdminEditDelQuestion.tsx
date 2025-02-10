import Link from "next/link";
import React from "react";

interface Question {
  setShowPopup: (arg0: boolean) => void;
  id: number;
  AdminEditref: React.RefObject<HTMLDivElement>;
  isCanEdit: boolean;
}

export default function AdminEditDelQuestion({
  id,
  setShowPopup,
  AdminEditref,
  isCanEdit,
}: Readonly<Question>) {
  return (
    <div ref={AdminEditref}>
      {isCanEdit ? (
        <Link
          className="text-yellow-500 font-bold mx-5"
          href={`/admin/EditQuestion?QuestionID=${id}`}
        >
          Edit
        </Link>
      ) : (
        <span className="text-gray-300 font-bold mx-5 cursor-not-allowed">
          Edit
        </span>
      )}
      <button
        className="text-red-500 font-bold"
        onClick={() => setShowPopup(true)}
      >
        Delete
      </button>
    </div>
  );
}
