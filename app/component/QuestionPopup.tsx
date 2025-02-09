"use client";
import React, { useEffect, useRef, useState } from "react";
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

  const handleClosePopup = () => {
    setShowPopup(false);
    setIsError(false);
    setName("");
    Question.ClosePopup(false);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
      handleClosePopup();
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

  return (
    <div className="bg-black bg-opacity-50 fixed inset-0 z-50 flex justify-center items-center">
      <div
        ref={popupRef}
        className="relative w-5/12 max-h-5xl bg-white shadow-lg rounded-lg"
      >
        {loading ? (
          <div>Loading...</div>
        ) : (
          <div className="flex flex-col">
            <div className="flex items-start justify-between p-5 border-b">
              <h3 className="text-3xl font-semibold">{showQuestion?.title}</h3>
              {role && (
                <AdminEditDelQuestion
                  id={Question.id}
                  setShowPopup={setShowPopup}
                />
              )}
            </div>

            <div className="flex-auto p-5">
              <div
                className="text-blueGray-500 text-lg leading-relaxed rich-text"
                dangerouslySetInnerHTML={{
                  __html: showQuestion?.description ?? "",
                }}
              />
            </div>

            <div className="flex justify-between items-center mx-6 pb-6">
              {showQuestion?.file_path && (
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
              )}
            </div>

            <form onSubmit={(e) => e.preventDefault()}>
              <div className="flex items-center justify-end p-6 border-t">
                <input
                  name="Answer"
                  type="search"
                  className="block w-full p-4 text-sm border rounded-lg"
                  placeholder="CTFCQ{...}"
                  required
                />
                <button
                  className="text-red-500 px-6 py-2"
                  type="button"
                  onClick={handleClosePopup}
                >
                  Close
                </button>
                <button
                  className="bg-emerald-500 text-white px-6 py-3 rounded"
                  type="submit"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
