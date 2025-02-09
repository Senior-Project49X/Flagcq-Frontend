import Link from "next/link";
import React from "react";

interface Question {
  setShowPopup: (arg0: boolean) => void;
  id: number;
  ref: React.RefObject<HTMLDivElement>;
}

export default function AdminEditDelQuestion({
  id,
  setShowPopup,
  ref,
}: Readonly<Question>) {
  return (
    <div ref={ref}>
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
