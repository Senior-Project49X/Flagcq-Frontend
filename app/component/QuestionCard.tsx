import { useState, useEffect } from "react";
import QuestionPopup from "./QuestionPopup";
import { usePathname } from "next/navigation";
import { DeleteQuestionTournament } from "../lib/API/QuestionAPI";
type detail = {
  id: number;
  Topic: string;
  Level: string;
  Category: string;
  Solved: boolean;
  point: string;
  addQuestionTournament?: (id: number) => void;
  question_id?: number[]; // Add this prop
  is_selected?: boolean;
  tournament_id?: number;
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
  is_selected,
  tournament_id,
}: Readonly<detail>) {
  const pathname = usePathname();
  const [showModal, setShowModal] = useState(false);
  const [select, setSelect] = useState(false);
  const [showPopupDelTournamentQuestion, setShowPopupDelTournamentQuestion] =
    useState(false);
  // Add useEffect to update selected state when question_id changes
  useEffect(() => {
    if (question_id && !is_selected) {
      setSelect(question_id.includes(id));
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
      if (is_selected && tournament_id) {
        setShowPopupDelTournamentQuestion(true);
      } else {
        select ? setSelect(false) : setSelect(true);
      }
      if (addQuestionTournament !== undefined) addQuestionTournament(id);
    } else {
      setShowModal(true);
    }
  };

  const handleDeleteQuestion = async () => {
    if (tournament_id) {
      await DeleteQuestionTournament(id, tournament_id);
      // if (addQuestionTournament !== undefined) addQuestionTournament(id);
    }
  };
  return (
    <>
      {showModal ? (
        <QuestionPopup id={id} ClosePopup={setShowModal} Topic={Topic} />
      ) : null}
      {showPopupDelTournamentQuestion && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-20">
          <div className="bg-white rounded-lg p-12 max-w-2xl w-full text-center relative">
            <button
              onClick={() => setShowPopupDelTournamentQuestion(false)}
              className="absolute top-4 right-4 text-gray-600 hover:text-black font-bold text-2xl"
            >
              X
            </button>
            <h2 className="text-red-500 font-bold text-3xl mb-8">
              <p className="text-green-400 mb-4 ">{Topic}</p> is already in
              Tournament Are you sure you want to delete the question in
              tournament?
            </h2>
            <div className="flex justify-center gap-4">
              <button
                onClick={handleDeleteQuestion}
                className="bg-red-500 text-white px-6 py-3 rounded-lg font-bold text-xl hover:bg-red-600"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
      <button
        className={`relative ${
          select || is_selected ? "bg-gray-300" : "bg-white"
        }  rounded-lg p-6 text-center cursor-pointer`}
        onClick={handleCardClicked}
      >
        {(is_selected || select) && (
          <div className="absolute inset-x-0 top-0  flex  items-center justify-center z-10">
            <div className=" rounded-full bg-green-500 object-cover py-2 px-3  flex items-center justify-center text-black text-xl">
              {is_selected ? "already in Tournament" : "✓"}
            </div>
          </div>
        )}

        <div className={`${(Solved || select) && "text-black opacity-60"}`}>
          <h2 className="text-xl font-bold mt-5">{Topic}</h2>
          <div className="absolute top-2 right-5">{showLevel(Level)}</div>
          {Solved ? <span>solve</span> : <span>{point}</span>}
          <p className="text-gray-500 absolute top-2 left-5"> {Category}</p>
        </div>
      </button>
    </>
  );
}
