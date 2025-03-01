import React, { useState } from "react";
import Image from "next/image";
import QuestionPopup from "./QuestionPopup";
import Link from "next/link";
import { DeleteQuestionsByID } from "../lib/API/QuestionAPI";
import DeleteQPuestionPopup from "./QuestionComponent/DeleteQuestionPopup";
import { questions } from "../lib/types/QuestionType";
import ArrowDropDownRoundedIcon from "@mui/icons-material/ArrowDropDownRounded";
import ArrowDropUpRoundedIcon from "@mui/icons-material/ArrowDropUpRounded";
import QuestionListDetail from "./QuestionComponent/QuestionListDetail";
type detail = {
  setSort: (sort: string) => void;
  sort?: { name: string; order: string };
  addQuestionTournament?: (id: number) => void;
  question_id?: number[]; // Add this prop
  tournament_id?: number;
  isAdmin: boolean;
  isCreateQuestionTournament?: boolean;
  questions: questions[];
};
export default function QuestionTable({
  setSort,
  sort,
  questions,
  isAdmin,
  addQuestionTournament,
  question_id,
  tournament_id,
  isCreateQuestionTournament,
}: Readonly<detail>) {
  return (
    <table className="table-auto w-full mr-16 ">
      <thead className="bg-gray-900 text-green">
        <tr>
          {isAdmin && isCreateQuestionTournament && (
            <th className=" px-4 py-2 text-green-400 ">Select</th>
          )}

          <th
            className="px-4 py-2 text-green-400 cursor-pointer hover:bg-gray-700"
            onClick={() => {
              setSort("QuestionName");
            }}
          >
            Question name
            {sort?.name === "QuestionName" && sort?.order === "asc" && (
              <ArrowDropUpRoundedIcon />
            )}
            {sort?.name === "QuestionName" && sort?.order === "desc" && (
              <ArrowDropDownRoundedIcon />
            )}
          </th>
          <th
            className="px-4 py-2 text-green-400 cursor-pointer hover:bg-gray-700"
            onClick={() => {
              setSort("Category");
            }}
          >
            Category
            {sort?.name === "Category" && sort?.order === "asc" && (
              <ArrowDropUpRoundedIcon />
            )}
            {sort?.name === "Category" && sort?.order === "desc" && (
              <ArrowDropDownRoundedIcon />
            )}
          </th>
          <th
            className=" px-4 py-2 text-green-400 cursor-pointer hover:bg-gray-700"
            onClick={() => {
              setSort("Difficulty");
            }}
          >
            Difficulty
            {sort?.name === "Difficulty" && sort?.order === "asc" && (
              <ArrowDropUpRoundedIcon />
            )}
            {sort?.name === "Difficulty" && sort?.order === "desc" && (
              <ArrowDropDownRoundedIcon />
            )}
          </th>
          <th
            className=" px-4 py-2 text-green-400 cursor-pointer hover:bg-gray-700
              
              "
            onClick={() => {
              setSort("Point");
            }}
          >
            Point
            {sort?.name === "Point" && sort?.order === "asc" && (
              <ArrowDropUpRoundedIcon />
            )}
            {sort?.name === "Point" && sort?.order === "desc" && (
              <ArrowDropDownRoundedIcon />
            )}
          </th>
          <th
            className=" px-4 py-2 text-green-400 cursor-pointer hover:bg-gray-700"
            onClick={() => {
              setSort("Solved");
            }}
          >
            Solved
            {sort?.name === "Solved" && sort?.order === "asc" && (
              <ArrowDropUpRoundedIcon />
            )}
            {sort?.name === "Solved" && sort?.order === "desc" && (
              <ArrowDropDownRoundedIcon />
            )}
          </th>
          {isAdmin && (
            <>
              <th className=" px-4 py-2 text-green-400">Edit</th>
              <th className=" px-4 py-2 text-green-400">Delete</th>
            </>
          )}
        </tr>
      </thead>
      <tbody>
        {questions.map((question) => (
          <QuestionListDetail
            addQuestionTournament={addQuestionTournament}
            key={question.id}
            id={question.id}
            Topic={question.title}
            Level={question.difficulty_id}
            Category={question.categories_name}
            Solved={question.solved}
            point={question.point}
            question_id={question_id} // Pass the prop
            is_selected={question.is_selected}
            tournament_id={tournament_id}
            isRoleAdmin={isAdmin}
            isCreateQuestionTournament={isCreateQuestionTournament}
            submitCount={question.submitCount}
            canEdit={question.canEdit}
          />
        ))}
      </tbody>
    </table>
  );
}
