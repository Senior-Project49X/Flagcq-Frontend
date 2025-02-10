import Link from "next/link";
import React from "react";

interface Question {
  setShowPopup: (arg0: boolean) => void;
  id: number;
  AdminEditref: React.RefObject<HTMLDivElement>;
}

export default function AdminEditDelQuestion({
  id,
  setShowPopup,
  AdminEditref,
}: Readonly<Question>) {
  return (
    <div ref={AdminEditref}>
      <Link
        className="text-yellow-500 font-bold mx-5"
        href={`/admin/EditQuestion?QuestionID=${id}`}
      >
        Edit
      </Link>
      <button
        className="text-red-500 font-bold"
        onClick={() => setShowPopup(true)}
      >
        Delete
      </button>
    </div>
  );
}
