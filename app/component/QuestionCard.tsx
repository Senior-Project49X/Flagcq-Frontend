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
  submitCount: number;
  question_id?: number[]; // Add this prop
  is_selected: boolean;
  tournament_id?: number;
  canEdit?: boolean;
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
  submitCount,
  canEdit,
}: Readonly<detail>) {
  const pathname = usePathname();
  const isPathTournament = pathname === "/admin/CreateQuestionTournament";
  const [showModal, setShowModal] = useState(false);
  const [select, setSelect] = useState(false);
  const [showPopupDelTournamentQuestion, setShowPopupDelTournamentQuestion] =
    useState(false);
  const isCanEdit = canEdit === true;
  // Add useEffect to update selected state when question_id changes
  useEffect(() => {
    if (question_id && !is_selected) {
      setSelect(question_id.includes(id));
    }
  }, [question_id, id, is_selected]);

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
        if (tournament_id === 0) {
          return;
        }
        select ? setSelect(false) : setSelect(true);
        if (addQuestionTournament !== undefined) addQuestionTournament(id);
      }
    } else {
      setShowModal(true);
    }
  };

  const handleDeleteQuestion = async () => {
    if (tournament_id) {
      await DeleteQuestionTournament(id, tournament_id);
    }
  };
  return (
    <>
      {showModal ? (
        <QuestionPopup
          tournamentId={tournament_id}
          id={id}
          ClosePopup={setShowModal}
          Topic={Topic}
          isCanEdit={isCanEdit}
        />
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
          (is_selected || select) && isPathTournament && tournament_id !== 0
            ? "bg-[#0D1B2A]"
            : "bg-gray-800"
        } rounded-lg p-6 text-center cursor-pointer shadow-lg glow-effect`}
        onClick={handleCardClicked}
      >
        {(is_selected || select) && isPathTournament && tournament_id !== 0 && (
          <AdminTournamentSelected is_selected={is_selected} />
        )}

        <div className={`${(Solved || select) && "opacity-60"} text-green-400`}>
          {/* Category and Difficulty */}
          <div className="flex justify-between items-center mb-2">
            <p className="text-black px-2 rounded-full bg-red-400">
              {Category}
            </p>
            {showLevel(Level)}
          </div>

          {/* Title */}
          <h2 className="text-xl font-bold mt-2 text-left truncate">{Topic}</h2>

          {/* Solves and Points in Same Row */}
          <div className="flex justify-between items-center mt-2 ">
            <p className="text-gray-300">{submitCount} Solved</p>
            <p>{Solved ? "solve" : point}</p>
          </div>
        </div>
      </button>
    </>
  );
}
