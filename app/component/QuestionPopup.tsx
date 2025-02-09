"use client";
import React, { FormEvent, useEffect, useRef, useState } from "react";
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
import DeleteQPuestionPopup from "./QuestionComponent/DeleteQuestionPopup";
import AdminEditDelQuestion from "./QuestionComponent/admin/AdminEditDelQuestion";

type State = {
  id: number;
  Topic: string;
  ClosePopup: Function;
};

export default function QuestionPopup(Question: Readonly<State>) {
  const [showPopup, setShowPopup] = useState(false);
  const [showQuestion, setShowQuestion] = useState<Question | null>(null);
  const [loading, setLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [name, setName] = useState("");
  const [role, setRole] = useState<boolean | null>(null);
  const [showCongratPopup, setShowCongratPopup] = useState(false);
  const popupRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setRole(isRoleAdmin() || isRoleTa());
  }, []);
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
  const handleClosePopup = () => {
    setShowPopup(false);
    setIsError(false);
    setName("");
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
      Question.ClosePopup(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const fetchQuestion = async () => {
      const getQuestion = await GetQuestionsByID(Question.id);
      setShowQuestion(getQuestion);
      setLoading(false);
    };
    fetchQuestion();
  }, [Question.id]);
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

  return (
    <>
      {showPopup && (
        <DeleteQPuestionPopup
          DeleteRef={popupRef}
          handleClosePopup={handleClosePopup}
          handleConfirmDelete={handleConfirmDelete}
          name={name}
          setName={setName}
          isError={isError}
        />
      )}
      {showCongratPopup && (
        <Yay
          yayRef={popupRef}
          handleCorrectAnswer={handleCorrectAnswer}
          showPopup={showCongratPopup}
          setShowCongratPopup={setShowCongratPopup}
        />
      )}
      <div className="bg-black bg-opacity-50 fixed inset-0 z-20 flex justify-center items-center">
        <div
          ref={popupRef}
          className="relative w-5/12  h-3/6 max-h-5xl bg-gray-800 shadow-lg rounded-lg"
        >
          {loading ? (
            <div>Loading...</div>
          ) : (
            <div className="flex flex-col border-0 rounded-lg shadow-lg relative w-full h-full outline-none focus:outline-none">
              <div className="flex items-start justify-between p-5 border-b border-gray-500">
                <h3 className="text-3xl font-semibold text-green-400">
                  {showQuestion?.title}
                </h3>
                {role && (
                  <AdminEditDelQuestion
                    ref={popupRef}
                    id={Question.id}
                    setShowPopup={setShowPopup}
                  />
                )}
              </div>

              <div className="flex-auto  p-5">
                <div
                  className="text-blueGray-500 text-lg leading-relaxed rich-text text-white "
                  dangerouslySetInnerHTML={{
                    __html: showQuestion?.description ?? "",
                  }}
                />
              </div>

              <div className="flex justify-between items-center mx-6 pb-6">
                {showQuestion?.file_path ? (
                  <button
                    className="text-black p-2 bg-green-400 rounded-lg flex space-x-2"
                    onClick={() => DownloadQuestionsByID(Question.id)}
                  >
                    <Image
                      src="/download.svg"
                      alt="Download"
                      width={20}
                      height={20}
                    />
                    <p>{showQuestion.file_path}</p>
                  </button>
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

              <form onSubmit={onCheckAnswer}>
                <div className=" lg:flex items-center justify-end p-6 border-t border-gray-500">
                  <input
                    name="Answer"
                    type="search"
                    className=" w-full p-4 text-sm border rounded-lg"
                    placeholder="CTFCQ{...}"
                    required
                  />

                  <button
                    className="bg-emerald-500 text-white px-6 py-3 rounded"
                    type="submit"
                  >
                    Submit
                  </button>
                  <button
                    className="text-red-500 px-6 py-2"
                    type="button"
                    onClick={() => Question.ClosePopup(false)}
                  >
                    Close
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
