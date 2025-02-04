import { useState, useEffect } from "react";
import QuestionPopup from "./QuestionPopup";
import { usePathname } from "next/navigation";
type detail = {
  id: number;
  Topic: string;
  Level: string;
  Category: string;
  Solved: boolean;
  point: string;
  addQuestionTournament?: (id: number) => void;
  question_id?: number[]; // Add this prop
};

export default function QuestionCard({
  id,
  Topic,
  Level,
  Category,
  Solved,
  point,
  addQuestionTournament,
  question_id,
}: Readonly<detail>) {
  const pathname = usePathname();
  const [showModal, setShowModal] = useState(false);
  const [selected, setSelected] = useState(false);

  // Add useEffect to update selected state when question_id changes
  useEffect(() => {
    if (question_id) {
      setSelected(question_id.includes(id));
    }
  }, [question_id, id]);

  const showLevel = (Level: string) => {
    if (Level == "Easy") {
      return <span className="text-green-500">Easy</span>;
    } else if (Level == "Medium") {
      return <span className="text-yellow-500">Medium</span>;
    } else {
      return <span className="text-red-500">Hard</span>;
    }
  };

  const handleCardClicked = () => {
    if (pathname == "/admin/CreateQuestionTournament") {
      selected ? setSelected(false) : setSelected(true);
      if (addQuestionTournament !== undefined) addQuestionTournament(id);
    } else {
      setShowModal(true);
    }
  };
  return (
    <>
      {showModal ? (
        <QuestionPopup id={id} ClosePopup={setShowModal} Topic={Topic} />
      ) : null}

      <button
        className={`relative ${
          selected ? "bg-gray-300" : "bg-white"
        }  rounded-lg p-6 text-center cursor-pointer`}
        onClick={handleCardClicked}
      >
        {selected && (
          <div className="absolute inset-0 flex items-center justify-center z-10">
            <div className="rounded-full bg-green-400 w-12 h-12 flex items-center justify-center text-black text-xl">
              ✓
            </div>
          </div>
        )}
        <div className={`${(Solved || selected) && "text-black opacity-60"}`}>
          <h2 className="text-xl font-bold mt-5">{Topic}</h2>
          <div className="absolute top-2 right-5">{showLevel(Level)}</div>
          {Solved ? <span>solve</span> : <span>{point}</span>}
          <p className="text-gray-500 absolute top-2 left-5"> {Category}</p>
        </div>
      </button>
    </>
  );
}
