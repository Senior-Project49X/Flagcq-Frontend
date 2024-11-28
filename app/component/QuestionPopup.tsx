"use client";
import React, { FormEvent, useEffect, useState } from "react";
import {
  CheckQuestionsByID,
  DownloadQuestionsByID,
  GetQuestionsByID,
} from "../lib/API/QuestionAPI";
import { question } from "../lib/types/QuestionType";

type state = {
  id: string;
  Topic: string;
  ClosePopup: Function;
};

export default function QuestionPopup(param: state) {
  const [showQuestion, setShowQuestion] = useState<question | null>(null);
  const [Answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(true);

  const onCheckAnswer = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(param.id);
    param.ClosePopup(false);
    const formData = new FormData(event.currentTarget);
    const answer = formData.get("Answer"); // Extract the value from FormData

    if (typeof answer === "string") {
      console.log("check", answer); // Safely log the string value
      CheckQuestionsByID(param.id, answer); // Pass the string to the API call
    } else {
      console.error("Answer is not a string"); // Handle unexpected cases
    }
    // CheckQuestionsByID(param.id, formData.get("Answer")?.toString);
  };

  useEffect(() => {
    const fetchQuestion = async () => {
      const getQuestion = await GetQuestionsByID(param.id);
      setShowQuestion(getQuestion);

      setLoading(false);
    };
    fetchQuestion();
    console.log("check", showQuestion);
  }, []);
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div
        className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
        onMouseDown={() => param.ClosePopup(false)}
      >
        <div
          className="relative w-auto my-6 mx-auto max-w-3xl"
          onMouseDown={(e) => e.stopPropagation()}
        >
          {/*content*/}
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            {/*header*/}
            <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
              <h3 className="text-3xl font-semibold">{showQuestion?.title}</h3>
              <button
                className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                onClick={() => param.ClosePopup(false)}
              >
                <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                  ×
                </span>
              </button>
            </div>
            {/*body*/}
            <div className="relative p-6 flex-auto">
              <p className="my-4 text-blueGray-500 text-lg leading-relaxed">
                {showQuestion?.description}
              </p>
            </div>

            <button
              onClick={() => {
                DownloadQuestionsByID(param.id);
              }}
            >
              {showQuestion?.file_path}
            </button>
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
                  onClick={() => param.ClosePopup(false)}
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
        </div>
      </div>
      <div className="opacity-40 fixed inset-0 z-40 bg-black"></div>
    </>
  );
}
