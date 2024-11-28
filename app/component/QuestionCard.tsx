import React from "react";
import QuestionPopup from "./QuestionPopup";
import Image from "next/image";
type detail = {
  id: string;
  Topic: string;
  Level: string;
  Category: string;
  Solved: boolean;
  point: string;
};

export default function QuestionCard({
  id,
  Topic,
  Level,
  Category,
  Solved,
  point,
}: detail) {
  const [showModal, setShowModal] = React.useState(false);

  return (
    <div className="relative">
      {showModal ? (
        <QuestionPopup id={id} ClosePopup={setShowModal} Topic={Topic} />
      ) : null}
      <div
        className="bg-white rounded-lg p-6 text-center cursor-pointer"
        onClick={() => setShowModal(true)}
      >
        <h2 className="text-xl font-bold mt-5">{Topic}</h2>
        <div className="absolute top-2 right-5">
          {Level == "Easy" ? (
            <span className="text-green-500">Easy</span>
          ) : Level == "Medium" ? (
            <span className="text-yellow-500">Medium</span>
          ) : (
            <span className="text-red-500">Hard</span>
          )}
        </div>
        {Solved ? <span>solve</span> : <span>{point}</span>}

        <p className="text-gray-500 absolute top-2 left-5"> {Category}</p>
      </div>
    </div>
  );
}
