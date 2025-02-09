import { useState, useEffect } from "react";
import QuestionPopup from "./QuestionPopup";
import { usePathname } from "next/navigation";
import { DeleteQuestionTournament } from "../lib/API/QuestionAPI";
import PopupDeleteTournamentQUestion from "./QuestionComponent/PopupDeleteTournamentQuestion";
import AdminTournamentSelected from "./QuestionComponent/admin/AdminTournamentSelected";
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
        <PopupDeleteTournamentQUestion
          setShowPopupDelTournamentQuestion={setShowPopupDelTournamentQuestion}
          handleDeleteQuestion={handleDeleteQuestion}
          Topic={Topic}
        />
      )}
      <button
        className={`relative ${
          select || is_selected ? "bg-[#0D1B2A]" : "bg-gray-800"
        } rounded-lg p-6 text-center cursor-pointer shadow-lg glow-effect`}
        onClick={handleCardClicked}
      >
        {(is_selected || select) && (
          <AdminTournamentSelected is_selected={is_selected} />
        )}

        <div className={`${(Solved || select) && "opacity-60"} text-green-400`}>
          <h2 className="text-xl font-bold mt-5">{Topic}</h2>
          <div className="absolute top-2 right-5">{showLevel(Level)}</div>
          {Solved ? <span>solve</span> : <span>{point}</span>}
          <p className="text-gray-300 absolute top-2 left-5"> {Category}</p>
        </div>
      </button>
    </>
  );
}
