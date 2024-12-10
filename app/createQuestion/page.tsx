"use client";
import React, { FormEvent, use, useEffect, useState } from "react";
import Image from "next/image";
import Navbar from "../component/navbar";
import { CreateQuestionAPI } from "../lib/API/QuestionAPI";
import LoadingPopup from "../component/LoadingPopup";
import { log } from "console";

interface CreateNewQuestion {
  CategoriesId: string | null;
  Title: string;
  Description: string;
  Answer: string;
  Point: number;
  DifficultyId: string;
  FilePath: File | null;
  Mode: string[];
}
interface ButtonStates {
  [key: string]: boolean; // Define a dynamic object where keys are strings and values are boolean
}
export default function CreateQuestion() {
  const [modeSelection, setModeSelection] = useState<ButtonStates>({
    Practice: false,
    Tournament: false,
    UnPublic: true,
  });

  const [Loading, setLoading] = useState<boolean>(false);
  const [isFailed, setIsFailed] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [selectedTournament, setSelectedTournament] = useState<string[]>([]);
  const onCreateQuestion = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    formData.append("Practice", modeSelection.Practice.toString());
    // formData.append("Tournament", []);
    console.log(typeof formData.get("Practice"));

    formData.append(`Tournament`, `[${selectedTournament.toString()}]`);

    CreateQuestionAPI(formData, { setIsFailed, setMessage, setIsSuccess });

    setLoading(true);
  };
  const handleToggle = (buttonKey: string): void => {
    if (buttonKey === "UnPublic") {
      setModeSelection((prevStates) => ({
        Practice: false,
        Tournament: false,
        UnPublic: true,
      }));
    } else if (buttonKey === "Tournament") {
      setModeSelection((prevStates) => ({
        Practice: false,
        Tournament: true,
        UnPublic: false,
      }));
    } else if (buttonKey === "Practice") {
      setModeSelection((prevStates) => ({
        Practice: true,
        Tournament: false,
        UnPublic: false,
      }));
    }
  };

  useEffect(() => {
    setMessage("");
    setIsFailed(false);
    setIsSuccess(false);
  }, [Loading]);

  return (
    <>
      {Loading && (
        <LoadingPopup
          setLoading={setLoading}
          isFailed={isFailed}
          isSuccess={isSuccess}
          Message={message}
        />
      )}

      <Navbar />
      <div className="bg-[#ffffff] m-8 p-8 rounded-lg text-2xl ">
        <form onSubmit={onCreateQuestion}>
          <label className="mr-2">Topic</label>
          <input
            type="text"
            name="title"
            className="text-red-400 border-2 border-stone-950 rounded-md p-1  "
          />
          <br />
          <label>Category</label>
          <select
            name="categories_id"
            className="border-2 border-stone-950 rounded-md p-1"
          >
            <option value={""}>---please select category---</option>
            <option value={1}>General Skill</option>
            <option value={2}>Cryptography</option>
            <option value={3}>Network</option>
            <option value={4}>Forensics</option>
          </select>
          <br />
          <label>Difficulty</label>
          <select
            name="difficultys_id"
            className="border-2 border-stone-950 rounded-md p-1"
          >
            <option value={""}>---please select Difficulty---</option>
            <option value={"Easy"}>Easy</option>
            <option value={"Medium"}>Medium</option>
            <option value={"Hard"}>Hard</option>
          </select>
          <br />
          <div>
            <p>Mode</p>
            {Object.keys(modeSelection).map((buttonKey, i) => (
              <button
                key={i}
                type="button"
                className={`px-4 py-2 font-bold rounded transition ${
                  modeSelection[buttonKey]
                    ? "bg-green-500 text-white"
                    : "bg-red-500 text-white"
                }`}
                onClick={() => handleToggle(buttonKey)}
              >
                {buttonKey}: {modeSelection[buttonKey] ? "ON" : "OFF"}
              </button>
            ))}
            {/* <button
              type="button"
              className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
            >
              Practice
            </button>
            <button
              type="button"
              className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
            >
              Tournament
            </button>

            <button
              type="button"
              className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
            >
              None
            </button> */}
          </div>
          <label>Description</label>
          <textarea
            name="Description"
            className="border-2 border-stone-950 rounded-md p-1"
          />
          <br />
          <label>{`Answer: CTFCQ{ `}</label>
          <input
            name="Answer"
            type="text"
            className="border-2 border-stone-950 rounded-md p-1"
          />
          <span>{` }`}</span>
          <br />
          <label>Point</label>
          <input
            name="point"
            type="number"
            min="0"
            max="10000000"
            className="border-2 border-stone-950 rounded-md p-1"
            onKeyDown={(e) => {
              if (
                e.key === "e" ||
                e.key === "E" ||
                e.key === "+" ||
                e.key === "-"
              )
                e.preventDefault();
            }}
          />
          <br />
          <label>File</label>
          <input name="file" type="file" />
          <br />
          <button
            type="submit"
            className="m-5 p-5 bg-[#ffffff] rounded-lg border-2 border-stone-950 p-1"
          >
            Confirm
          </button>
        </form>
      </div>
    </>
  );
}
