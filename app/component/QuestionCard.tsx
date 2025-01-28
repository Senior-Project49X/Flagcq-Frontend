import React from "react";
import QuestionPopup from "./QuestionPopup";
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
}: Readonly<detail>) {
  const [showModal, setShowModal] = React.useState(false);
  const showLevel = (Level: string) => {
    if (Level == "Easy") {
      return <span className="text-green-500">Easy</span>;
    } else if (Level == "Medium") {
      return <span className="text-yellow-500">Medium</span>;
    } else {
      return <span className="text-red-500">Hard</span>;
    }
  };
  return (
    <>
      {showModal ? (
        <QuestionPopup id={id} ClosePopup={setShowModal} Topic={Topic} />
      ) : null}
      <button
        className={`relative bg-white ${
          Solved && "opacity-60"
        } rounded-lg p-6 text-center cursor-pointer`}
        onClick={() => setShowModal(true)}
      >
        <h2 className="text-xl font-bold mt-5">{Topic}</h2>
        <div className="absolute top-2 right-5">{showLevel(Level)}</div>
        {Solved ? <span>solve</span> : <span>{point}</span>}

        <p className="text-gray-500 absolute top-2 left-5"> {Category}</p>
      </button>
    </>
  );
}
