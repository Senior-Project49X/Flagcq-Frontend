"use client";
import React, { FormEvent, useEffect, useState } from "react";
import {
  CheckQuestionsByID,
  DeleteQuestionsByID,
  DownloadQuestionsByID,
  GetQuestionsByID,
} from "../lib/API/QuestionAPI";
import { Question } from "../lib/types/QuestionType";
import Image from "next/image";
import Hint from "./Hint/Hint";
import { isRoleAdmin, isRoleTa } from "../lib/role";
import Yay from "./QuestionComponent/yay";
import { get } from "http";
import Link from "next/link";
import DeleteQPuestionPopup from "./QuestionComponent/DeleteQuestionPopup";
import AdminEditDelQuestion from "./QuestionComponent/admin/AdminEditDelQuestion";
type state = {
  id: number;
  Topic: string;
  ClosePopup: Function;
};

export default function QuestionPopup(Question: Readonly<state>) {
  const [showPopup, setShowPopup] = useState(false);
  const [showQuestion, setShowQuestion] = useState<Question | null>(null);
  const [loading, setLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [name, setName] = useState("");
  const [role, setRole] = useState<boolean | undefined | null>(null);
  const [roleLoading, setRoleLoading] = useState(true);
  const [showCongratPopup, setShowCongratPopup] = useState<boolean | undefined>(
    false
  );

  useEffect(() => {
    setRole(isRoleAdmin() || isRoleTa());
    setRoleLoading(false);
  }, []);

  const handleClosePopup = () => {
    setShowPopup(false);
    setIsError(false);
    setName(""); // Reset input
  };

  // Handle delete confirmation
  const handleConfirmDelete = () => {
    if (name === showQuestion?.title) {
      DeleteQuestionsByID(Question.id);
      handleClosePopup();
      Question.ClosePopup(false);
      location.reload();
    } else {
      setIsError(true);
    }
  };

  const handleCorrectAnswer = () => {};
  const onCheckAnswer = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(Question.id);

    const formData = new FormData(event.currentTarget);
    const answer = formData.get("Answer"); // Extract the value from FormData

    if (typeof answer === "string") {
      const fetchQuestion = async () => {
        const isCorrect = await CheckQuestionsByID(Question.id, answer);
        if (isCorrect) {
          setShowCongratPopup(true);
        }
      };
      fetchQuestion();
    } else {
      console.error("Answer is not a string"); // Handle unexpected cases
    }
  };

  useEffect(() => {
    const fetchQuestion = async () => {
      const getQuestion = await GetQuestionsByID(Question.id);
      setShowQuestion(getQuestion);

      setLoading(false);
    };
    fetchQuestion();
  }, [Question.id]);

  if (roleLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <button
        className=" justify-center items-center cursor-auto flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
        onMouseDown={() => Question.ClosePopup(false)}
      >
        <button
          className="select-text cursor-auto relative w-5/12 h-3/6 max-h-5xl max-w-5xl"
          onMouseDown={(e) => e.stopPropagation()}
        >
          {showPopup && (
            <DeleteQPuestionPopup
              handleClosePopup={handleClosePopup}
              handleConfirmDelete={handleConfirmDelete}
              name={name}
              setName={setName}
              isError={isError}
            />
          )}
          {showCongratPopup && (
            <Yay
              handleCorrectAnswer={handleCorrectAnswer}
              showPopup={showCongratPopup}
              setShowCongratPopup={setShowCongratPopup}
            />
          )}
          {loading ? null : (
            // content
            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full h-full bg-white outline-none focus:outline-none">
              {/*header*/}
              <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                <h3 className="text-3xl font-semibold">
                  {showQuestion?.title}
                </h3>
                {role && (
                  <AdminEditDelQuestion
                    id={Question.id}
                    setShowPopup={setShowPopup}
                  />
                )}
              </div>

              {/*body*/}
              <div className="flex-auto">
                <div
                  className="text-blueGray-500 text-lg leading-relaxed rich-text"
                  dangerouslySetInnerHTML={{
                    __html: showQuestion?.description ?? "",
                  }}
                />
              </div>
              <div className="flex justify-between items-center mx-6 pb-6">
                {showQuestion?.file_path ? (
                  <div>
                    <button
                      className="text-black  p-2 bg-green-400 rounded-lg flex space-x-2"
                      onClick={() => {
                        DownloadQuestionsByID(Question.id);
                      }}
                    >
                      <Image
                        src="/download.svg"
                        alt="Download"
                        width={20}
                        height={20}
                        className="object-contain"
                      />
                      <p>{showQuestion.file_path}</p>
                    </button>
                  </div>
                ) : (
                  <div></div>
                )}

                <div>
                  <div className="inline-flex rounded-md shadow-sm ">
                    {showQuestion?.hints.map((hint, i) => (
                      <Hint
                        id={hint.id}
                        key={hint.id}
                        index={i}
                        description={hint.Description}
                        used={hint.used}
                        penalty={hint.point}
                        isLast={i === showQuestion.hints.length - 1}
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/*footer*/}

              <form onSubmit={onCheckAnswer}>
                <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                  <span className="max-w-md mx-auto">
                    <input
                      name="Answer"
                      type="search"
                      id="default-search"
                      className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="CTFCQ{...}"
                      required
                    />
                  </span>
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => Question.ClosePopup(false)}
                  >
                    Close
                  </button>
                  <button
                    className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="submit"
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          )}
        </button>
      </button>

      <button
        className="opacity-40 fixed inset-0 z-40 bg-black cursor-auto"
        onMouseDown={() => Question.ClosePopup(false)}
      ></button>
    </>
  );
}
