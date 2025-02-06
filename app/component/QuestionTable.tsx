import React from "react";
import Difficult from "../difficult";
import Image from "next/image";

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
export default function QuestionTable({
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
    <tr className="even:bg-gray-50 odd:bg-white">
      {isCreateQuestionTournament && (
        <td className="border border-gray-300 px-4 py-2 ">
          <div className="justify-center flex">
            <input type="checkbox" />
          </div>
        </td>
      )}

      <td className="border border-gray-300 px-4 py-2">{Topic}</td>
      <td className="border border-gray-300 px-4 py-2 ">{showLevel(Level)}</td>
      <td className="border border-gray-300 px-4 py-2">{point}</td>
      <td className="border border-gray-300 px-4 py-2">{submitCount}</td>

      {isRoleAdmin && (
        <>
          <td className="border border-gray-300 px-4 py-2 ">
            <div className="justify-center flex">
              <button
                className={`p-2 transition rounded-md ${
                  submitCount !== 0
                    ? "cursor-not-allowed bg-gray-200"
                    : "bg-yellow-200 hover:bg-yellow-300"
                }`}
                title={
                  submitCount !== 0
                    ? "Someone already submitted"
                    : "Click to Submit"
                }
              >
                <Image src="/edit.svg" width={15} height={15} alt={"Edit"} />
              </button>
            </div>
          </td>
          <td className="border border-gray-300 px-4 py-2">
            <div className="justify-center flex">
              <button className="p-2 bg-red-300 hover:bg-red-500 transition rounded-md">
                <Image
                  src="/delete.svg"
                  width={15}
                  height={15}
                  alt={"Delete"}
                />
              </button>
            </div>
          </td>
        </>
      )}
    </tr>
  );
}
