"use client";
import React, { FormEvent, use, useEffect, useState } from "react";
import Image from "next/image";
import Navbar from "../component/navbar";
import { CreateQuestionAPI } from "../lib/API/QuestionAPI";
import LoadingPopup from "../component/LoadingPopup";
import { log } from "console";

interface typeOfNewData {
  CategoriesId: string | null;
  Title: string;
  Description: string;
  Answer: string;
  Point: number;
  DifficultyId: string;
  FilePath: File | null;
  Mode: string;
}

export default function CreateQuestion() {
  const [Loading, setLoading] = useState<boolean>(false);
  const [isFailed, setIsFailed] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const onCreateQuestion = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    CreateQuestionAPI(formData, { setIsFailed, setMessage, setIsSuccess });

    setLoading(true);
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
            <option value={"General Skill"}>General Skill</option>
            <option value={"Cryptography"}>Cryptography</option>
            <option value={"Network"}>Network</option>
            <option value={"Forensics"}>Forensics</option>
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
          <label>Mode</label>
          <select
            name="type"
            className="border-2 border-stone-950 rounded-md p-1"
          >
            <option value={""}>---please select Mode---</option>
            <option value={"Practice"}>Practice</option>
            <option value={"Tournament"}>Tournament</option>
          </select>
          <br />
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
