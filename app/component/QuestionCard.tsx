import React from "react";
import QuestionPopup from "./QuestionPopup";
import Image from "next/image";
type detail = {
  id: string;
  Topic: string;
  Level: string;
  Category: string;
  isSolve: boolean;
};

export default function QuestionCard(param: detail) {
  const [showModal, setShowModal] = React.useState(false);
  const [isSolve, setIsSolve] = React.useState(false);
  React.useEffect(() => {
    setIsSolve(param.isSolve);
  }, []);
  return (
    <div className="relative">
      {showModal ? (
        <QuestionPopup
          ClosePopup={setShowModal}
          Topic={param.Topic}
          setIsSolved={setIsSolve}
        />
      ) : null}
      <div
        className="bg-white rounded-lg p-6 text-center cursor-pointer"
        onClick={() => setShowModal(true)}
      >
        <h2 className="text-xl font-bold mt-5">{param.Topic}</h2>
        <div className="absolute top-2 right-5">
          {param.Level == "Easy" ? (
            <p className="text-green-500">Easy</p>
          ) : param.Level == "Medium" ? (
            <p className="text-yellow-500">Medium</p>
          ) : (
            <p className="text-red-500">Hard</p>
          )}
        </div>
        {isSolve ? <span>solve</span> : <span>-</span>}

        <p className="text-gray-500 absolute top-2 left-5"> {param.Category}</p>
      </div>
    </div>
  );
}
