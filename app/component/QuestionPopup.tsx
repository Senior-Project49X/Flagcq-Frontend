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
  const onCheckAnswer = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const answer = formData.get("Answer") as string;

    if (!answer) return;

    try {
      const isCorrect = await CheckQuestionsByID(Question.id, answer);
      if (isCorrect) {
        setShowCongratPopup(true);
        setIsError(false); // Reset error when correct
      } else {
        setIsError(true); // Set error when incorrect
      }
    } catch (error) {
      console.error("Error checking answer:", error);
      setIsError(true);
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
      <div className="fixed inset-0 z-20 overflow-y-auto bg-black bg-opacity-50">
        <div className="flex min-h-full items-center justify-center p-4">
          <div className="relative w-full max-w-3xl bg-gray-800 rounded-lg shadow-xl">
            {loading ? (
              <div className="p-6 text-white">Loading...</div>
            ) : (
              <div
                ref={popupRef}
                className="flex flex-col max-h-[80vh] min-h-[60vh]"
              >
                {/* Header */}
                <div className="flex items-start justify-between p-5 border-b border-gray-500">
                  <h3 className="text-3xl font-semibold text-green-400 break-words">
                    {showQuestion?.title}
                  </h3>
                  {role && (
                    <AdminEditDelQuestion
                      AdminEditref={popupRef}
                      id={Question.id}
                      setShowPopup={setShowPopup}
                    />
                  )}
                </div>

                {/* Scrollable Content Area */}
                <div className="flex-1 overflow-y-auto">
                  {/* Description */}
                  <div className="p-5">
                    <div
                      className="text-white text-lg leading-relaxed break-words rich-text"
                      dangerouslySetInnerHTML={{
                        __html: showQuestion?.description ?? "",
                      }}
                    />
                  </div>

                  {/* Download and Hints */}
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 px-6 pb-6">
                    {showQuestion?.file_path ? (
                      <button
                        className="text-black p-2 bg-green-400 rounded-lg flex items-center space-x-2 hover:bg-green-500 transition-colors"
                        onClick={() => DownloadQuestionsByID(Question.id)}
                      >
                        <Image
                          src="/download.svg"
                          alt="Download"
                          width={20}
                          height={20}
                        />
                        <p className="break-all">{showQuestion.file_path}</p>
                      </button>
                    ) : (
                      <div></div>
                    )}
                    <div className="flex-shrink-0">
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
                </div>

                {/* Footer with Form */}
                <form
                  onSubmit={onCheckAnswer}
                  className="border-t border-gray-500"
                >
                  <div className="p-4 sm:p-6">
                    <div className="flex flex-col sm:flex-row gap-4">
                      <div className="w-full">
                        <input
                          name="Answer"
                          type="search"
                          className={`w-full p-4 text-sm border-4 rounded-lg 
            ${
              isError
                ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                : "border-gray-300 focus:ring-blue-500 focus:border-blue-500"
            }
          `}
                          placeholder="CTFCQ{...}"
                          required
                        />
                        {/* Error Message */}
                        {isError && (
                          <p className="mt-2 text-sm text-red-500">
                            ❌ Answer is incorrect
                          </p>
                        )}
                      </div>

                      <div className="flex gap-2">
                        <button
                          className="bg-emerald-500 text-white px-6 py-3 rounded hover:bg-emerald-600 transition-colors"
                          type="submit"
                        >
                          Submit
                        </button>
                        <button
                          className="text-red-500 px-6 py-3 hover:text-red-600 transition-colors"
                          type="button"
                          onClick={() => Question.ClosePopup(false)}
                        >
                          Close
                        </button>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
