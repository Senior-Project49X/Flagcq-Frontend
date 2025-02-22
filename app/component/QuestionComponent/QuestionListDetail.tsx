import React, { useEffect, useState } from "react";
import Image from "next/image";
import QuestionPopup from "../QuestionPopup";
import Link from "next/link";
import {
  DeleteQuestionsByID,
  DeleteQuestionTournament,
} from "../../lib/API/QuestionAPI";
import DeleteQPuestionPopup from "../QuestionComponent/DeleteQuestionPopup";
import { FaCheck } from "react-icons/fa";
import PopupDeleteTournamentQUestion from "./PopupDeleteTournamentQuestion";
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
  isRoleAdmin: boolean;
  submitCount: number;
  isCreateQuestionTournament?: boolean;
};
export default function QuestionListDetail({
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
  isRoleAdmin,
  isCreateQuestionTournament,
}: Readonly<detail>) {
  const isCanEdit = !is_selected && submitCount === 0;
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [select, setSelect] = useState(false);
  const [showPopupDelTournamentQuestion, setShowPopupDelTournamentQuestion] =
    useState(false);

  const showLevel = (Level: string) => {
    if (Level == "Easy") {
      return <span className="text-green-500">Easy</span>;
    } else if (Level == "Medium") {
      return <span className="text-yellow-500">Medium</span>;
    } else {
      return <span className="text-red-500">Hard</span>;
    }
  };
  const handleDeleteQuestion = async () => {
    if (tournament_id) {
      await DeleteQuestionTournament(id, tournament_id);
    }
  };
  const handleCheckboxChange = () => {
    if (is_selected && tournament_id !== 0) {
      setShowPopupDelTournamentQuestion(true);
    } else {
      if (tournament_id === 0) {
        return;
      }
      select ? setSelect(false) : setSelect(true);
      if (addQuestionTournament !== undefined) addQuestionTournament(id);
    }
  };

  useEffect(() => {
    if (question_id && !is_selected) {
      setSelect(question_id.includes(id));
    }
  }, [question_id, id, is_selected]);
  const handleConfirmDelete = () => {
    DeleteQuestionsByID(id);
    setShowDeletePopup(false);

    location.reload();
  };
  return (
    <tr className="even:bg-[#0D1B2A] odd:bg-gray-800 text-white">
      {isCreateQuestionTournament && (
        <td className=" px-4 py-2">
          {showPopupDelTournamentQuestion && (
            <PopupDeleteTournamentQUestion
              setShowPopupDelTournamentQuestion={
                setShowPopupDelTournamentQuestion
              }
              handleDeleteQuestion={handleDeleteQuestion}
              Topic={Topic}
            />
          )}
          <div className="justify-center flex">
            {is_selected && tournament_id !== 0 && (
              <button
                className="p-1 bg-red-400 hover:bg-red-600 transition rounded-md"
                onClick={handleCheckboxChange}
              >
                <Image
                  src="/tournament_fight.svg"
                  width={25}
                  height={25}
                  alt={"Check"}
                />
              </button>
            )}
            {select && (!is_selected || tournament_id === 0) && (
              <button
                className="p-2 bg-green-400 hover:bg-green-600 transition rounded-md"
                onClick={handleCheckboxChange}
              >
                <FaCheck />
              </button>
            )}
            {!select && (!is_selected || tournament_id === 0) && (
              <button
                className="p-4 bg-white hover:bg-gray-600 transition rounded-md"
                onClick={handleCheckboxChange}
              ></button>
            )}
          </div>
        </td>
      )}

      <td className=" px-4 py-2 ">
        {showDeletePopup && (
          <DeleteQPuestionPopup
            // DeleteRef={null}
            handleClosePopup={() => setShowDeletePopup(false)}
            handleConfirmDelete={handleConfirmDelete}
          />
        )}
        {showModal && (
          <div>
            <QuestionPopup
              tournamentId={tournament_id}
              isCanEdit={isCanEdit}
              id={id}
              ClosePopup={setShowModal}
              Topic={Topic}
            />
          </div>
        )}
        <button
          onClick={() => setShowModal(true)}
          className="hover:text-blue-500 underline"
        >
          {Topic}
        </button>
      </td>
      <td className="px-4 py-2 ">{Category}</td>
      <td className="px-4 py-2 ">{showLevel(Level)}</td>
      <td className="px-4 py-2 ">{point}</td>
      <td className="px-4 py-2 ">{submitCount}</td>

      {isRoleAdmin && (
        <>
          <td className=" px-4 py-2 ">
            <div className="justify-center flex">
              <button
                disabled={!isCanEdit}
                className={`p-2 transition rounded-md flex items-center justify-center ${
                  isCanEdit
                    ? "bg-yellow-200 hover:bg-yellow-300"
                    : "cursor-not-allowed bg-gray-200"
                }`}
              >
                <Link
                  href={`/admin/EditQuestion?QuestionID=${id}`}
                  title={
                    isCanEdit ? "Click to Submit" : "Someone already submitted"
                  }
                >
                  <Image src="/edit.svg" width={15} height={15} alt={"Edit"} />
                </Link>
              </button>
            </div>
          </td>
          <td className=" px-4 py-2">
            <div className="justify-center flex">
              <button
                className="p-2 bg-red-300 hover:bg-red-500 transition rounded-md"
                onClick={() => {
                  setShowDeletePopup(true);
                }}
              >
                <div className="flex items-center justify-center">
                  <Image
                    src="/delete.svg"
                    width={15}
                    height={15}
                    alt={"Delete"}
                  />
                </div>
              </button>
            </div>
          </td>
        </>
      )}
    </tr>
  );
}
